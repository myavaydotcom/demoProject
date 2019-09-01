import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
  apiKey: "AIzaSyCA5_YosTwaNSom9wVByuM547ZtqRuHKas",
  authDomain: "project-732d1.firebaseapp.com",
  databaseURL: "https://project-732d1.firebaseio.com",
  projectId: "project-732d1",
  storageBucket: "project-732d1.appspot.com",
  messagingSenderId: "1081374044291",
  appId: "1:1081374044291:web:4baf4b3f3390b844"
};

firebase.initializeApp(firebaseConfig);

export const f = firebase;
export const auth = firebase.auth();
export const database = firebase.database();
export const storage = firebase.storage();
