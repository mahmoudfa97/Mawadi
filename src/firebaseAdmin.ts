// server/firebaseAdmin.ts
import admin from 'firebase-admin';
import * as serviceAccount from '../serviceAccount.json'; // Update with your service account path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mawadi-ec01d-default-rtdb.firebaseio.com"
});

export const auth = admin.auth()