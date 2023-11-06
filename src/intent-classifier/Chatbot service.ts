import IntentClassifier from "./intent-classifier.service";

class ChatbotService {
  private intentClassifier: IntentClassifier;
  constructor() {
    this.intentClassifier = new IntentClassifier();
  }
  public processMessage(message: string): string {
    // Get the intent from the classifier
    const intent = this.intentClassifier.getIntent(message);
    console.log("intent",intent);
    // Perform actions based on the detected intent
    if (intent === 'greeting') {
      return 'Hello! How can I assist you?';
    } else if(  intent=='farewell') {
      return 'ok bye';
    } 
  }
}
export default ChatbotService;

