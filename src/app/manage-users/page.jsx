"use client";
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
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { checkIsAdminLogin } from "@/functions/checkIsAdminLogin";
import { deleteUser } from "@/functions/deleteUser";

export default function ManageUsers() {
  const router = useRouter();
  useEffect(() => {
    const isLogedIn = checkIsAdminLogin();
    if (!isLogedIn) {
      router.push("/login");
    }
  }, []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [metaData, setMetaData] = useState({});
  const [users, setUsers] = useState([]);

 
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // let  filteredUsers = [];

  const indexOfLastUser = currentPage * usersPerPage;


  const totalPages = metaData?.totalPages || 1;

  const handleDelete = (id) => {
    console.log("delete user", id);
    deleteUser(id,setLoading,setError);
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
     
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Paid User</TableHead>
            <TableHead>Joined Date</TableHead>
            {/* <TableHead>Status</TableHead> */}
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user?.id}>
              <TableCell>{user?.firstName}</TableCell>
              <TableCell>{user?.emailAddresses[0].emailAddress}</TableCell>
              <TableCell>{user?.publicMetadata?.trialStatus ? "Free":"Paid"}</TableCell>
              <TableCell>
                {new Date(user?.createdAt).toLocaleString()}
              </TableCell>
              {/* <TableCell>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  {user.status}
                </Badge>
              </TableCell> */}
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
