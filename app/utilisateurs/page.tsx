"use client";
import { getAllUsers } from "@/actions/users";
import { User } from "@/utils/definitions";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  
  type Users = User[];
  const [users, setUsers] = useState<Users>([]);

  const getUsers = async () => {
    console.log(await getAllUsers());
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h1>Users List</h1>
        <ul>
            {users.map((user, index) => (
            <li key={index}>
                <Link href={`utilisateurs/${user.id}`}>{user.id} {user.nom} {user.postnom}</Link>
            </li>
            ))}
        </ul>
    </div>
  );
}
