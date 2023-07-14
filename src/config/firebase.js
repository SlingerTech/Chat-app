import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  query,
  where,
  updateDoc,
  onSnapshot,
  getDoc,
  orderBy,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQH_5wM9dPnZYd2VS-0eBh2quxc3WJbf4",
  authDomain: "react-application-69ff3.firebaseapp.com",
  projectId: "react-application-69ff3",
  storageBucket: "react-application-69ff3.appspot.com",
  messagingSenderId: "293009071295",
  appId: "1:293009071295:web:12fa2c22ee8c6e8cf97a0a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//Sign up new users
export async function signupNewUser(collectFormData) {
  try {
    const { email, password, name, phoneNo } = collectFormData;

    // Create user in Firebase
    const getUserIdFromFirebase = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userGeneratedId = getUserIdFromFirebase.user.uid;

    const docRef = await addDoc(collection(db, "userData"), {
      userName: name,
      userEmail: email,
      userPhoneNo: phoneNo,
      UserId: userGeneratedId,
    });

    return {
      status: "success",
    };
  } catch (error) {
    return {
      status: "error",
      error: error.message,
    };
  }
}

//Login Exiting User
export async function loginUser(collectFormData) {
  try {
    const { email, password } = collectFormData;
    await signInWithEmailAndPassword(auth, email, password);
    console.log("login");
    return {
      status: "sucess",
    };
  } catch (error) {
    return {
      status: "error",
      error: error.message,
    };
  }
}

//Logout exiting User
export async function logoutUser() {
  const currentUserId = auth.currentUser.uid;
  try {
    await signOut(auth);

    return {
      status: "sucess",
    };
  } catch (error) {
    return {
      status: "error",
      error: error.message,
    };
  }
}

//Get all Users
export async function getAllUsers() {
  const currentUserId = auth.currentUser.uid;

  try {
    const querySnapshot = await getDocs(query(collection(db, "userData")));

    if (querySnapshot.empty) {
      console.log("No User found!");
      return [];
    }

    const usersData = querySnapshot.docs.map((doc) => doc.data());

    // Filter out the current user from the list of users
    const filteredUsers = usersData.filter(
      (user) => user.UserId !== currentUserId
    );

    return filteredUsers;
  } catch (error) {
    console.error("Error retrieving user details:", error.message);
    return [];
  }
}

//Check And Create Chat room
export async function checkAndCreateRoom(friendId) {
  const currentUserId = auth.currentUser.uid;
  const createAt = Date.now();
  const users = {
    [currentUserId]: true,
    [friendId]: true,
  };

  // Create a query to check for existing chat rooms
  const q = query(
    collection(db, "chatrooms"),
    where(`users.${currentUserId}`, "==", true),
    where(`users.${friendId}`, "==", true)
  );

  const querySnapshot = await getDocs(q);
  let roomId;

  if (querySnapshot.empty) {
    // No existing chat room found, create a new document
    const docRef = await addDoc(collection(db, "chatrooms"), {
      users,
      createdAt: createAt,
      lastMessage: {},
    });

    roomId = docRef.id;
    console.log("New chat room created:", roomId);

    // Return the newly created room ID
    return { roomId };
  } else {
    // Chat room already exists, retrieve the document ID
    const existingRoom = querySnapshot.docs[0];
    roomId = existingRoom.id;

    // Return the existing room ID
    return { roomId };
  }
}

//Getting Room Info
export async function getRoomInfo({ roomId, sendMessage }) {
  const chatroomRef = doc(db, "chatrooms", roomId);
  const currentUserId = auth.currentUser.uid;
  const createdAt = Date.now();

  try {
    const chatroomSnap = await getDoc(chatroomRef);
    if (chatroomSnap.exists()) {
      const messagesCollectionRef = collection(chatroomRef, "messages");
      const newMessageRef = await addDoc(messagesCollectionRef, {
        userId: currentUserId,
        createdAt,
        text: sendMessage,
      });
      console.log(
        'Subcollection "messages" created with ID:',
        newMessageRef.id
      );
    } else {
      console.log("Chatroom does not exist.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

//Get All Messages
export function getAllMessages(roomId, setMessages) {
  const docRef = doc(db, "chatrooms", roomId);
  const messagesQuery = query(
    collection(docRef, "messages"),
    orderBy("createdAt")
  );

  return onSnapshot(messagesQuery, (snapshot) => {
    const messages = [];
    try {
      snapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      setMessages(messages);
    } catch (err) {
      console.log("error from get all message function", err);
    }
  });
}

//All Chatroom that are created already
export async function alreadyCreatedChatRoom() {
  const currentUserId = auth.currentUser.uid;
  try {
    const q = query(
      collection(db, "chatrooms"),
      where("users." + currentUserId, "==", true)
    );
    let currentUserFromDatabase;
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      currentUserFromDatabase = doc.data().users;
    });

    const currentUser = currentUserId;
    let friendId = null;
    let foundCurrent = false;

    for (const id in currentUserFromDatabase) {
      if (foundCurrent) {
        friendId = id;
        break;
      }

      if (id === currentUser) {
        foundCurrent = true;
      }
    }

    console.log('friendId', friendId);
    return;
  } catch (err) {
    console.log("error", err);
    return;
  }
}
