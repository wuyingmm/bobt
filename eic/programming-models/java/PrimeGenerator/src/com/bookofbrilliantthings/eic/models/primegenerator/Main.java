package com.bookofbrilliantthings.eic.models.primegenerator;

public class Main
{
	public static void main(String argv[])
	{
		for(Long longObj:new PrimeGenerator(20))
		{
			System.out.print(longObj.longValue());
			System.out.println();
		}
	}
}
