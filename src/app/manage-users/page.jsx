"use client"
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2Icon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { manageUsers } from "@/functions/manageUsers";

export default function ManageUsers() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [metaData, setMetaData] = useState({});
    const [users, setUsers] = useState(
        [
    {
      id: 1,
      name: "John Don",
      email: "john@gmail.com",
      phone: "No phone number",
      joinedDate: "9/24/2024",
      status: "verified",
    },
    {
      id: 2,
      name: "Pranit Patil",
      email: "patilpranit@gmail.com",
      phone: "No phone number",
      joinedDate: "9/24/2024",
      status: "verified",
    },
    {
      id: 3,
      name: "Test User",
      email: "testclerk@gmail.com",
      phone: "No phone number",
      joinedDate: "9/24/2024",
      status: "verified",
    },
    {
      id: 4,
      name: "Test User",
      email: "testclerk121@gmail.com",
      phone: "No phone number",
      joinedDate: "9/24/2024",
      status: "verified",
    },
    {
      id: 5,
      name: "Test User",
      email: "testclerk123@gmail.com",
      phone: "No phone number",
      joinedDate: "9/24/2024",
      status: "verified",
    },
    {
      id: 6,
      name: "KUNAL SALUNKHE",
      email: "salunkhekunal594@gmail.com",
      phone: "No phone number",
      joinedDate: "9/24/2024",
      status: "verified",
    },
    {
      id: 7,
      name: "Pranit Patil",
      email: "rieshdhapatepatil@gmail.com",
      phone: "No phone number",
      joinedDate: "9/20/2024",
      status: "verified",
    },
    {
      id: 8,
      name: "karan vishwakarma",
      email: "karanvishwakarma732@gmail.com",
      phone: "No phone number",
      joinedDate: "9/19/2024",
      status: "verified",
    },
    {
      id: 9,
      name: "ABHISHEK VISHWAKARMA",
      email: "21cs2022@rgipt.ac.in",
      phone: "No phone number",
      joinedDate: "9/19/2024",
      status: "verified",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = metaData?.totalPages || 1;

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    };
    

    useEffect(() => {
      manageUsers(
        setUsers,
        setMetaData,
        setLoading,
        setError,
        currentPage,
        usersPerPage
      );
    }, [currentPage]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
      <div className="flex justify-between items-center">
        <Input
          type="text"
          placeholder="Filter users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Joined Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.joinedDate}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          <ChevronLeftIcon className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
          <ChevronRightIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
