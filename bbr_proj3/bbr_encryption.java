/**
 * File name: bbr_encryption.java
 * This class serves as an encryption and decryption functions to use the Diffie-Hellman key exchange algorithm and encrypt bitwise level encryption.
 */

import java.math.*;
class bbr_encryption {

	public static byte getPad(int ssk) 
	{

        byte x = (byte)(ssk & 0xFF);
        return x;
    }
    public static String encrypt(String message, byte pad) {
        byte[] byteArray = new byte[message.length()];
        char[] test = new char[message.length()];
        String output = "";
        for(int x = 0; x < message.length();x++)
        {
            int val = (int)message.charAt(x);
            byteArray[x] = (byte)val;
            byteArray[x] = (byte)((byte)byteArray[x] ^ pad);
            int temp = (int)byteArray[x];
            test[x] = (char)temp;
            output = output+test[x];
        }

        return output;
    }
    public static String decrypt(String message, byte pad) {
        byte[] byteArray = new byte[message.length()];
        char[] test = new char[message.length()];
        String reput = "";
        for(int x = 0; x < message.length();x++)
        {
            int val = (int)message.charAt(x);
            byteArray[x] = (byte)val;
            byteArray[x] = (byte)((byte)byteArray[x] ^ pad);
            int temp = (int)byteArray[x];
            test[x] = (char)temp;
            reput = reput+test[x];
        }

        return reput;
    }
    public static int generateSecret(int pk, int n, int g)
    {
        BigInteger tempG = BigInteger.valueOf(g);
        BigInteger tempN = BigInteger.valueOf(n);
        BigInteger temp = tempG.pow(pk);
        BigInteger bsk = temp.mod(tempN); 
        int sk = bsk.intValue();
        return sk;
    }
    public static int generateSharedSecret(int pk, int n, int sk)
    {
        BigInteger tempN = BigInteger.valueOf(n);
        BigInteger tempSK = BigInteger.valueOf(sk);
        BigInteger temp = tempSK.pow(pk);
        temp = temp.mod(tempN);
        int ssk = temp.intValue();
        return ssk;
    }
}