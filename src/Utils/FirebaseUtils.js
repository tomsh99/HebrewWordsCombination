import firebase from "../Firebase/Firebase";

const wordsRef = firebase.firestore().collection('words');


export default class FirebaseUtils {
  static async getVarifiedWords() {
    const ref = wordsRef.doc('varified');
    const response = await ref.get();
    return Object.keys(response.data());
  }

  static async getUnvalidWords() {
    const ref = wordsRef.doc('unvalid');
    const response = await ref.get();
    return Object.keys(response.data());
  }

  static async addVarifiedWord(word) {
    const ref = wordsRef.doc('varified');
    ref.update({
      [word]: word
    });
  }

  static async addUnvalidWord(word) {
    const ref = wordsRef.doc('unvalid');
    ref.update({
      [word]: word
    });
  }

  static async getWikiWords() {
    const ref = wordsRef.doc('wiki');
    const response = await ref.get();
    return response.data();
  }
}