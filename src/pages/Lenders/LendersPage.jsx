import React from "react";
import { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import DataGridTable from "../../components/DataGrid/DataGridTable";

const LendersPage = () => {
  const usersCollectionRef = collection(db, "products");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await getDocs(usersCollectionRef);
      const userData = response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(userData);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  }; 

  return (
    <div className="p-4 mx-4">
      <h1 className="mt-5">All Lenders</h1>
      <div className="mt-16">
        <DataGridTable data={users} />
      </div>
    </div>
  )
};

export default LendersPage;
