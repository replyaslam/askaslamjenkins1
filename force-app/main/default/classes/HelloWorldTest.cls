@isTest
public class HelloWorldTest {
    @isTest static void validatePrintHello(){
        Test.startTest();
        	HelloWorld.printHello();
        Test.stopTest();
    }
}