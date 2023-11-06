import * as natural from 'natural';
class IntentClassifier {
  private classifier: natural.BayesClassifier;
  constructor() {
    this.classifier = new natural.BayesClassifier();
    this.trainClassifier();
  }
  private trainClassifier() {
    // Train the classifier with sample intents and their corresponding messages
   this.classifier.addDocument('Hi', 'greeting');
   this.classifier.addDocument('bye', 'farewell');
    // Add more intents and training messages as needed
    this.classifier.train();
    // Add more intents and training messages as needed
  }
  public getIntent(message: string): string {
    // Classify the message and return the intent
    const intent = this.classifier.classify(message);
    return intent;
  }
}
export default IntentClassifier;