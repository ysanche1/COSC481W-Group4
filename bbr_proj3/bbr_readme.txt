Project 1: TCP Messaging Client & Server
Programmer: Benjamin Bruursema
Class: COSC 439


Project Description
The goal is to protect chat messages while in transit by providing a secure communication channel, 
without having to worry about host security. The secure communication channel will be implemented using a 
bit-level encryption, and the encryption key (or the one-time pad) will be computed using the Diffie-Hellman
key exchange algorithm. For simplicity, we will use 1-byte pads in this project (extract the right most byte of 
the encryption key and use that as a 1-byte pad).

These two applications serve as a communication to transfer messages between a multiple clients and a server.
The server will take a port number and wait for it's client to connect and establish each client as a new thread.
Once a connection is established the server application will begin a chat log and store all subsequent communiocations.  
Once the last client has left the chat room the log file will be deleted.

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

How to Run

The server takes an optional set of the following arguments.

-p : port
-g : Prime Base for Diffie-Hellman
-n : Prime Mod for Diffie-Hellman

-Example: bbr_TCPServerMT -p 20050 -n 128 -g 33

The values will default to 20050, 128, and 33 as above if no port is specified.

The client application takes an optional set of 3 arguments.

-u : Username
-p : Port
-h : Hostname

-Example: bbr_TCPClient -u user -p 20050 -123.123.123.123

If any of these arguments are left off they will default to the following:

-u : The client will ask for a username.
-p : 20050
-h : localhost

Conclusion
 - Estimated Time to Complete: Approximately 12-16 hours.
 - Any Difficulites Encountered: Ensuring my keys were properly random and different per client.
 - Does everything work? if not what part doesn't work: I realized in my final testing that a few situations the randomly generated value breaks the l and k character (turns them into new lines) and I have a glitch I am still trying to figure out (a set of either new line or space characters are not decrypting prior to output at the very end of the output);
 - How to improve the project: None that I can think of.

