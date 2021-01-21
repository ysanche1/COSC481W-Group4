/* Multi-threaded Server program
 * File name: bbr_TCPServer.java
 * Programmer: Benjamin Bruursema
 * Chat Logic derived from: https://www.codejava.net/java-se/networking/how-to-create-a-chat-console-application-in-java-using-socket
 * This application acts as a server to manage concurrent client communications.  It takes in a port number using the -p argument and defaults to 20050
 * if no port is provided.  Once a client has connected the server starts a new thread and logs all chat details to the log file.  All clients share
 * the same log file and once the last client has left the log file is deleted.  When a new client joins a chat session if there is an existing file and
 * existing sessions, the users will be displayed and the log will be read out to that user.
 * Arguments: 
 * 		-p <port>
 * 		-n <prime modulus> for secret key calculation
 * 		-g <prime base> for secret key calculation
 * Default: 
 * 		-p 20050
 * 		-h localhost
 * 		-u You will be asked by the application for a user.
 * 
 * Once a client has connected the server starts a new thread and logs all chat details to the log file.  All clients share
 * the same log file and once the last client has left the log file is deleted.  When a new client joins a chat session if there is an existing file and
 * existing sessions, the users will be displayed and the log will be read out to that user.
 * 
 * Once a client connects to the server they are provided the G and N values by the server and a security key.  The Client computes it's security key and sends back a security key.
 * Both client and server each compute their shared secret encryption key which is used byte encryption.
*/

import java.io.*;
import java.net.*;
import java.util.*;

public class bbr_TCPServer {
	private int port;
	private ServerSocket servSock;
	private Set<String> users = new HashSet<>();
	private Set<ClientHandler> clients = new HashSet<>();
	private int n;
	private int g;
	
	File file = new File("bbr_log.txt");
	PrintWriter logWrite;
	BufferedReader logRead;
	boolean loggingEnabled;

	/*
	 * Default Constructor for Server object.
	 */
	public bbr_TCPServer(int port,int n, int g) {
		this.port = port;
		this.n = n;
		this.g = g;
	}

	/*
	 * Main Method for TCP Server Class
	 */
	public static void main(String[] args) {
		System.out.println("Opening port...\n");
		String port = "";
		int g = -999;
		int n = -999;
		for (int x = 0; x < args.length; x++) {
			switch (args[x].toString()) {
			case "-p":
				port = args[x + 1];
				x++;
				break;
			case "-g":
				g = Integer.parseInt(args[x + 1]);
				x++;
				break;
			case "-n":
				n = Integer.parseInt(args[x + 1]);
				x++;
			default:
				System.out.println("Invalid Entry: Valid options include -p <Port Number> -g <prime base> -n <prime modulus>");
				System.exit(1);
			}
		}
		// If no valid argument is found, set default values.
		if (port == "") {
			port = "20050";
		}
		if(g == -999)
		{
			g = 33;
		}
		if(n == -999)
		{
			n = 128;
		}
		bbr_TCPServer server = new bbr_TCPServer(Integer.parseInt(port),n,g);
		server.run();
	}

	/*
	 * Run Method that establishes each thread. This method is called automatically
	 * when the server starts.
	 */
	private void run() {
		try {
			// Create a socket object and log buffers.
			servSock = new ServerSocket(port);
			logWrite = new PrintWriter(new FileWriter(file));
			logRead = new BufferedReader(new FileReader(file));
			
			/*
			 * This flag is used to control if a file has been deleted. On first pass it is
			 * enabled but once the file has been deleted this flag is set to false until a
			 * new user joins
			 */
			loggingEnabled = true;

		} catch (IOException e) {
			System.out.println("Unable to attach to port!");
			System.exit(1);
		}
		do {

			try {
				// Put the server into a waiting state
				file = new File("bbr_log.txt");
				Socket link = servSock.accept();

				// print local host name
				int pk = (int)(Math.random() * 1000);
				String host = InetAddress.getLocalHost().getHostName();
				System.out.println("Client has estabished a connection to " + host);
				int sk = bbr_encryption.generateSecret(pk, n, g);
				System.out.println(sk);
				int ssk = 0;
				try 
				{
					BufferedReader handShake = new BufferedReader(new InputStreamReader(link.getInputStream()));
					PrintWriter handOut = new PrintWriter(link.getOutputStream(), true);


					String message = Integer.toString(sk);
					handOut.println(g);
					handOut.println(n);
					handOut.println(sk);
					int sk2 = Integer.parseInt(handShake.readLine());
					ssk = bbr_encryption.generateSharedSecret(pk, n, sk2);

					System.out.println("N: " + n + " G: " + g + " Private key: " + pk);
					System.out.println("Server Sent: "+ sk);
					System.out.println("Client Sent: "+ sk2);
					System.out.println("Computed Shared: "+ ssk);

				}catch (IOException e) 
				{
					e.printStackTrace();
				}
				// Create a thread to handle this connection and add it to hashset to contain
				// all possible clients.
				ClientHandler handler = new ClientHandler(link, this, ssk);
				clients.add(handler);
				// start serving this connection
				handler.start();

			} catch (Exception e) {
				e.printStackTrace();
			}
		} while (true);

	}

	/*
	 * Function for adding a user to a server session. This function also checks to
	 * see if logging has been enabled and if it has not then it enables it.
	 */
	public void addUser(String u) {
		users.add(u);
		if (loggingEnabled == false) {
			try {
				file = new File("bbr_log.txt");
				logWrite = new PrintWriter(new FileWriter(file));
				logRead = new BufferedReader(new FileReader(file));
				loggingEnabled = true;
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	/*
	 * This function takes in a string and a client and will broadcast the message
	 * to all other clients. (It will skip the sender)
	 */
	public void broadcast(String message, ClientHandler fromUser, byte pad) {
		if(bbr_encryption.decrypt(message,pad).contains("Close Session"))
		{
			message = bbr_encryption.decrypt(message,pad);
			message = bbr_encryption.encrypt("Close Session",pad);
		}
		for (ClientHandler u : clients) {
			if (u != fromUser) {
				u.sendMessage(bbr_encryption.encrypt(message, u.pad));
			}
		}
	}

	/*
	 * This function will send a direct message from the server to a specific
	 * client. (Opposite of a broadcast)
	 */
	public void dm(String message, ClientHandler fromUser) {
		for (ClientHandler u : clients) {
			if (u == fromUser) {
				u.sendMessage(message);
			}
		}
	}

	/*
	 * This function controls for when a user leaves. 1. The users and client
	 * sessions are removed from the hash lists 2. A leaving message is broadcast to
	 * the channel stating the user has left. 3. Then if the file is empty it closes
	 * the log readers/writers and deletes the log file. 4. To protect against
	 * errors the loggingEnabled is set to false so when a new user is added a new
	 * logging session begins.
	 */
	public void userExit(String u, ClientHandler fromUser, byte pad) {
		boolean removed = users.remove(u);
		if (removed) {
			clients.remove(fromUser);
			System.out.println(u + " has left the chat");
			broadcast(u + " has left the chat", fromUser, pad);
			if (clients.isEmpty()) {
				try {
					logRead.close();
					logWrite.close();
					file.delete();
					loggingEnabled = false;
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}

	}

	/*
	 * Function to check if the server has users connected.
	 */
	public boolean hasUsers() {
		return !this.users.isEmpty();
	}

	/*
	 * Function to return the users connected to the server.
	 */
	public Set<String> getUsers() {
		return this.users;
	}

}

/*
 * This ClientHandler class acts as a thread to manage the communications
 * between the client and server.
 */

class ClientHandler extends Thread {
	private Socket client;
	private BufferedReader in;
	private PrintWriter out;
	private bbr_TCPServer server;
	byte pad;
	/*
	 * Constructor for ClientHandler class used to maintain object through threads.
	 */

	public ClientHandler(Socket s, bbr_TCPServer srv, int ssk) {
		// set up the socket and link to the central server.
		this.client = s;
		this.server = srv;
		this.pad = bbr_encryption.getPad(ssk);
	}

// overwrite the method 'run' of the Runnable interface

// this method is called automatically when a client thread starts.
	public void run() {

		// Receive and process the incoming data

		try {
			//establish start time and variables for duration calculation and the number of messages.
			long openTime = System.currentTimeMillis();
			long closeTime = 0;
			int duration, milliseconds, seconds, minutes, hours;
			int numMessages = 0;
			this.in = new BufferedReader(new InputStreamReader(client.getInputStream()));
			this.out = new PrintWriter(client.getOutputStream(), true);

			/*
			 * Begin the session by printing the users.
			 * Then add the user to the server and start the log.
			 * If there is an existing log, print that log to the screen.
			 */
			
			printUsers(pad);
			
			String user = bbr_encryption.decrypt(in.readLine(),pad);
			server.addUser(user);
			printLog(server.file,pad);
			
			/*
			 * Broadcast to everyone else that a new user has joined and there details.
			 */
			
			String serverMessage = "New user connected: " + user;
			System.out.println(serverMessage);
			writeLog(serverMessage, server.logWrite);
			server.broadcast(serverMessage, this,pad);
			
			/*
			 * While loop that will broadcast all messages for the client to all other clients.  
			 * Once a DONE command is received the connection will be closed.
			 */
			
			String message;
			do {
				message = bbr_encryption.decrypt(in.readLine(),pad);
				System.out.println(user + ":" + message);
				server.broadcast(user + ":" + message, this, pad);
				//server.broadcast(">",this);
				//Just in case a user types the END message, it should be logged differently.
				if(message.contains("!Close Session!"))
				{
					writeLog(user + ":" + "Close Session", server.logWrite);
				}
				else
				{
					writeLog(user + ":" + message, server.logWrite);
				}
				numMessages++;
			} while (!message.equals("DONE"));
			
			/*
			 * Once the DONE command is received the server sends the a count of messages received and the duration of the session
			 * directly to the client for their contributions.
			 */
			
			
			message = bbr_encryption.encrypt(("Server received " + numMessages + " messages"),pad);
			server.dm(user + ":" + message, this);

			closeTime = System.currentTimeMillis();
			duration = (int) (closeTime - openTime);
			milliseconds = Math.floorMod(duration, 1000);
			seconds = duration / 1000;
			minutes = seconds / 60;
			seconds = Math.floorMod(seconds, 60);
			hours = minutes / 60;
			minutes = Math.floorMod(minutes, 60);
			message = bbr_encryption.encrypt("Duration: " + hours + "::" + minutes + "::" + seconds + "::" + milliseconds,pad);
			//System.out.println(message);
			server.dm(message, this);
			
			/* 
			 * This close session message tell the client application to exit.
			 */
			
			message = bbr_encryption.encrypt("!!!Close Session!!!",pad);
			server.dm(user + ":" + message, this);
			
			/*
			 * Lastly the client thread tells the server to close the client thread and remove the user.
			 */
			server.userExit(user, this, pad);

		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {

				client.close();
			} catch (IOException e) {
				System.out.println("Unable to disconnect!");
				System.exit(1);
			}
		}
	}

	/*
	 * A function to send messages to the server.
	 */
	public void sendMessage(String message) {
		out.println(message);
	}
	
	/*
	 * A function to check if the server has users and then display those users.
	 */
	
	public void printUsers(byte pad) {
		if (server.hasUsers()) {
			out.println(bbr_encryption.encrypt("Connected Users: " + server.getUsers(),pad));
		} else {
			out.println(bbr_encryption.encrypt("No Other Users Connected",pad));
		}
	}
	/*
	 * A function to retrieve the log, parse through it, and display the details on the screen.
	 */
	public synchronized void printLog(File log, byte pad) {
		try {
			String logText = "";
			BufferedReader tempRead = new BufferedReader(new FileReader(log));
			while ((logText = tempRead.readLine()) != null) {
				if(logText.contains("Close Session"))
				{
					out.println(bbr_encryption.encrypt("Close Session",pad));
				}
				out.println(bbr_encryption.encrypt(logText,pad));
			}
			tempRead.close();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	/*
	 * A function to write data to the log file.
	 */
	public synchronized void writeLog(String s, PrintWriter logWrite) {
		try {
			logWrite.append(s + "\n");
			logWrite.flush();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}