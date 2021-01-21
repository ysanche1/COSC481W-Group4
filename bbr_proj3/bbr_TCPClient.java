/* Programmer: Benjamin Bruursema
 * Client program
 * File name: bbr_TCPClient.java
 * Chat Logic derived from: https://www.codejava.net/java-se/networking/how-to-create-a-chat-console-application-in-java-using-socket
 * This application acts as a client to send secure communication to a broadcast server that acts as a chat room.  
 * Arguments: 
 * 		-p <port>
 * 		-u <username>
 * 		-h <host address>
 * Default: 
 * 		-p 20050
 * 		-h localhost
 * 		-u You will be asked by the application for a user.
 * 
 * Once a client has connected the server starts a new thread and logs all chat details to the log file.  All clients share
 * the same log file and once the last client has left the log file is deleted.  When a new client joins a chat session if there is an existing file and
 * existing sessions, the users will be displayed and the log will be read out to that user.
*/
import java.io.*;
import java.net.*;
import java.util.*;


public class bbr_TCPClient {
	private InetAddress host;
	private String userName;
	private int port;
	

	/*
	 * Constructor for the client.
	 */
	
	public bbr_TCPClient(String hostname, int port, String userName) {
		try {
			this.host = InetAddress.getByName(hostname);
			this.port = port;
			this.userName = userName;
		} catch (Exception e) {
			System.out.println("Unable to attach to port!");
			System.exit(1);
		}
	}

	/*
	 * This will run automatically to create the threads for reading and writing. (Sending and receiving communications)
	 */
	
	private void run() {
		try {

			int ssk = 0;
			Socket link = new Socket(host, port);
			System.out.println("Connected to the Server: " + host + ":" + port);
			try 
			{
				BufferedReader handShake = new BufferedReader(new InputStreamReader(link.getInputStream()));
				PrintWriter handOut = new PrintWriter(link.getOutputStream(), true);
				
				int pk = (int)(Math.random() * 1000);
				int g = Integer.parseInt(handShake.readLine());
				int n = Integer.parseInt(handShake.readLine());
				int sk2 = Integer.parseInt(handShake.readLine());

				int sk = bbr_encryption.generateSecret(pk, n, g);
				ssk = bbr_encryption.generateSharedSecret(pk, n, sk2);
				
				//String Message = Integer.toString(sk);
				handOut.println(sk);
				System.out.println("N: " + n + " G: " + g + " Private key: " + pk);
				System.out.println("Server Sent: "+ sk);
				System.out.println("Client Sent: "+ sk2);
				System.out.println("Computed Shared: "+ ssk);


			}catch (Exception e) 
			{
				System.out.println("Unable to attach to port!");
				System.exit(1);
			}
			//These start the threads for accepting and sending communications.
			new readThread(link, this, ssk).start();
			new writeThread(link, this, ssk).start();
			
		} catch (Exception e) {
			System.out.println("Unable to attach to port!");
			System.exit(1);
		}

	}

	public void setUser(String userName) {
		this.userName = userName;
	}

	public String getUser() {
		return this.userName;
	}

	/*
	 * Main function to parse argument details and create client object to begin the session.
	 */
	
	public static void main(String[] args) {
		String username = "";
		String hostname = "";
		String port = "";
		// Loop through each arguments for a valid argument.
		for (int x = 0; x < args.length; x++) {
			switch (args[x].toString()) {
			case "-u":
				username = args[x + 1];
				x++;
				break;
			case "-h":
				hostname = args[x + 1];
				x++;
				break;
			case "-p":
				port = args[x + 1];
				x++;
				break;
			default:
				System.out.println(
						"Invalid Entry: Valid options include -h <hostname/IP Address> -u <username> -p <Port Number>");
				System.exit(1);
			}
		}
		// If only some or no valid arguments are found, set default values.
		try {
			if (hostname == "") {
				hostname = "localhost";
			}
			if (port == "") {
				port = "20050";
			}
			if (username == "") {
				// If Username is not found, request a username from the terminal
				BufferedReader keyboard = new BufferedReader(new InputStreamReader(System.in));
				System.out.print("Please Enter Your Username: ");
				username = keyboard.readLine();
			}
		} catch (Exception e) {
			System.exit(1);
		}
		bbr_TCPClient client = new bbr_TCPClient(hostname, Integer.parseInt(port), username);
		client.run();
	}

}
	/*
	 * A read thread that allows for a simultaneous communication between the server and the client.  This thread receives messages.
	 */
class readThread extends Thread {
	private BufferedReader reader;
	private Socket socket;
	private bbr_TCPClient client;
	private byte pad;

	/*
	 * Constructor for the thread establishing the client and the socket for communications as well as establishing the connection from the input stream.
	 */
	public readThread(Socket socket, bbr_TCPClient client,int ssk) {
		this.socket = socket;
		this.client = client;
		this.pad = bbr_encryption.getPad(ssk);
		try {
			reader = new BufferedReader(new InputStreamReader(socket.getInputStream()));

		} catch (Exception e) {
			System.out.println("Unable to attach to port!");
			System.exit(1);
		}
	}
	/*
	 * This will run until the client session is closed by receiving a message labeled "Close Session"
	 */
	public void run() {
		while (true) {
			try {
				String message = bbr_encryption.decrypt(reader.readLine(),pad);
				if (message != null) {

					if (message.contains("!!!Close Session!!!")) {
						System.exit(1);
					} else {
						System.out.println("\b \b \n " + message);
						message = null;
					}
				} else {
					if (client.getUser() != null) {
						System.out.print(client.getUser() + ": ");
					}
				}

			} catch (Exception e) {
				System.out.println("Unable to attach to port!");
				System.exit(1);
				break;
			}
		}
	}
}
	/*
	 * This class is used to function as a "sender" thread that allows for sending out messages while receiving messages on the other thread.
	 */
class writeThread extends Thread {
	private PrintWriter writer;
	private Socket socket;
	private bbr_TCPClient client;
	private String user;
	private byte pad;
	/*
	 * Constructor for the writer thread to establish 
	 */
	public writeThread(Socket socket, bbr_TCPClient client, int ssk) {
		this.socket = socket;
		this.client = client;
		this.user = client.getUser();
		this.pad = bbr_encryption.getPad(ssk);
		try {
			writer = new PrintWriter(socket.getOutputStream(), true);
		} catch (Exception e) {
			System.out.println("Unable to attach to port!");
			System.exit(1);
		}
	}
	/* 
	 * This process runs ready to send a message and will wait to send it to the server when received.
	 */
	public void run() {
		try {
			Scanner userEntry = new Scanner(System.in);
			String message = bbr_encryption.encrypt(user, pad);
			writer.println(message);
			System.out.println(user + " has connected");
			do {
				message = bbr_encryption.encrypt(userEntry.nextLine(),pad);
				System.out.print(">");
				writer.println(message);
			} while (!bbr_encryption.decrypt(message,pad).equals("DONE"));

		} catch (Exception e) {
			System.out.println("Unable to attach to port!");
			System.exit(1);
		}
		try {
			/*
			 * This delay is used so that the server can send all final communications details.
			 */
			Thread.sleep(3000);
			socket.close();

		} catch (Exception e) {
			System.exit(1);// e.printStackTrace();
		}
	}
}