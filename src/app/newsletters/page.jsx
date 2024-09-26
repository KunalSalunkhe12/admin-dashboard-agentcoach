"use client";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format, addDays, parse, format as formatDate } from "date-fns";
import { motion } from "framer-motion";
import { Clock, Send } from "lucide-react";
import { getNewsletterPageData } from "@/functions/getNewsLatterPageData";
import Loading from "@/components/Loading";
import { changeAutoEmailSentTime } from "@/functions/changeAutoEmailSentTime";

export default function Newsletters() {
  const [selectedTime, setSelectedTime] = useState("1:00 PM");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    DailyEmailTemplet: [],
    serverCurrentTime: "4:53 PM",
    emailSentTime: "",
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const time = new Date(2023, 0, 1, hour, minute);
      timeOptions.push(format(time, "h:mm a"));
    }
  }

  const handleOnChangeTime = async (e) => {
    setSelectedTime(e);
    changeAutoEmailSentTime(e, setLoading, setError);
  };
  useEffect(() => {
    getNewsletterPageData(setData, setLoading, setError);
  }, []);

  if (loading) {
    return <Loading />;
  }

  // return (
  //   <motion.div
  //     className="space-y-6"
  //     initial="hidden"
  //     animate="visible"
  //     variants={containerVariants}
  //   >
  //     <motion.h1
  //       className="text-3xl font-bold text-gray-900"
  //       variants={itemVariants}
  //     >
  //       Manage Newsletters
  //     </motion.h1>

  //     <motion.div className="space-y-4" variants={itemVariants}>
  //       <div>
  //         <h2 className="text-xl font-semibold mb-2">
  //           Select Time for Daily Newsletters (Central Time) current server Time
  //           ({data.serverCurrentTime}) and auto email sent time (
  //           {data.emailSentTime})
  //         </h2>
  //         <Select
  //           onValueChange={(e) => handleOnChangeTime(e)}
  //           value={selectedTime}
  //         >
  //           <SelectTrigger className="w-[180px] shadow-md hover:shadow-lg transition-shadow duration-300">
  //             <SelectValue placeholder="Select time" />
  //           </SelectTrigger>
  //           <SelectContent className="shadow-lg">
  //             {timeOptions.map((time, index) => (
  //               <SelectItem key={index} value={time}>
  //                 {time}
  //               </SelectItem>
  //             ))}
  //           </SelectContent>
  //         </Select>
  //       </div>

  //       <motion.div className="mt-8" variants={itemVariants}>
  //         <h2 className="text-2xl font-semibold mb-4">Upcoming Newsletters</h2>
  //         <motion.div
  //           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  //           variants={containerVariants}
  //         >
  //           {data.DailyEmailTemplet.map((email, index) => (
  //             <motion.div
  //               key={index}
  //               variants={itemVariants}
  //               whileHover={{ scale: 1.05 }}
  //               whileTap={{ scale: 0.95 }}
  //             >
  //               <Card
  //                 className={`flex flex-col h-full ${email.color} shadow-lg hover:shadow-xl transition-shadow duration-300`}
  //               >
  //                 <CardHeader>
  //                   <CardTitle>{email.title}</CardTitle>
  //                   <CardDescription>
  //                     Scheduled for {email.scheduledDate}
  //                   </CardDescription>
  //                 </CardHeader>
  //                 <CardContent className="flex-grow flex flex-col">
  //                   <motion.img
  //                     src={email.image}
  //                     alt={email.title}
  //                     className="w-full h-40 object-cover rounded-md mb-4"
  //                     initial={{ opacity: 0 }}
  //                     animate={{ opacity: 1 }}
  //                     transition={{ delay: 0.2 }}
  //                   />

  //                   <p className="text-sm text-gray-600 flex-grow">
  //                     {email.message}
  //                   </p>
  //                 </CardContent>
  //               </Card>
  //             </motion.div>
  //           ))}
  //         </motion.div>
  //       </motion.div>
  //     </motion.div>
  //   </motion.div>
  // );
   return (
     <motion.div
       className="space-y-6"
       initial="hidden"
       animate="visible"
       variants={containerVariants}
     >
       <motion.h1
         className="text-3xl font-bold text-gray-900"
         variants={itemVariants}
       >
         Manage Newsletters
       </motion.h1>

       <motion.div className="space-y-4" variants={itemVariants}>
         <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
           <CardHeader>
             <CardTitle className="text-2xl">
               Newsletter Time Settings
             </CardTitle>
             <CardDescription className="text-gray-200">
               Configure your daily newsletter schedule
             </CardDescription>
           </CardHeader>
           <CardContent className="space-y-4">
             <div className="flex items-center space-x-4">
               <Clock className="h-6 w-6" />
               <div>
                 <p className="text-sm font-medium">Current Server Time (CT)</p>
                 <p className="text-xl font-bold">{data.serverCurrentTime}</p>
               </div>
             </div>
             <div className="flex items-center space-x-4">
               <Send className="h-6 w-6" />
               <div>
                 <p className="text-sm font-medium">
                   Auto Email Sent Time (CT)
                 </p>
                 <p className="text-xl font-bold">{ data.emailSentTime}</p>
               </div>
             </div>
             <div>
               <label className="text-sm font-medium mb-2 block">
                 Select New Time for Daily Newsletters (Central Time)
               </label>
               <Select onValueChange={handleOnChangeTime} value={selectedTime}>
                 <SelectTrigger className="w-[180px] bg-white text-gray-900">
                   <SelectValue placeholder="Select time" />
                 </SelectTrigger>
                 <SelectContent className="bg-white">
                   {timeOptions.map((time, index) => (
                     <SelectItem key={index} value={time}>
                       {time}
                     </SelectItem>
                   ))}
                 </SelectContent>
               </Select>
             </div>
           </CardContent>
         </Card>

         <motion.div className="mt-8" variants={itemVariants}>
           <h2 className="text-2xl font-semibold mb-4">Upcoming Newsletters</h2>
           <motion.div
             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
             variants={containerVariants}
           >
             {data.DailyEmailTemplet.map((email, index) => (
               <motion.div
                 key={index}
                 variants={itemVariants}
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
               >
                 <Card
                   className={`flex flex-col h-full ${email.color} shadow-lg hover:shadow-xl transition-shadow duration-300`}
                 >
                   <CardHeader>
                     <CardTitle>{email.title}</CardTitle>
                     <CardDescription>
                       Scheduled for at {email.scheduledDate}
                     </CardDescription>
                   </CardHeader>
                   <CardContent className="flex-grow flex flex-col">
                     <motion.img
                       src={email.image}
                       alt={email.title}
                       className="w-full h-40 object-cover rounded-md mb-4"
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ delay: 0.2 }}
                     />

                     <p className="text-sm text-gray-600 flex-grow">
                       {email.message}
                     </p>
                   </CardContent>
                 </Card>
               </motion.div>
             ))}
           </motion.div>
         </motion.div>
       </motion.div>
     </motion.div>
   );
}





// export default function Newsletters() {
//   const [selectedTime, setSelectedTime] = useState("");
//   const [futureEmails, setFutureEmails] = useState([]);
//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     // Update current time every minute
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 60000);

//     // Generate future emails for the next 3 days
//     const emails = [];
//     for (let i = 1; i <= 3; i++) {
//       emails.push({
//         date: addDays(new Date(), i),
//         image: `https://picsum.photos/seed/${i}/400/200`,
//         title: `Newsletter ${i}`,
//         message: `This is the content for Newsletter ${i}. It will be sent on ${format(addDays(new Date(), i), "MMMM d, yyyy")}.`,
//         color: `border-l-4 border-${["blue", "green", "purple"][i - 1]}-500`,
//       });
//     }
//     setFutureEmails(emails);

//     return () => clearInterval(timer);
//   }, []);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//     },
//   };

//   const timeOptions = [];
//   for (let hour = 0; hour < 24; hour++) {
//     for (let minute = 0; minute < 60; minute += 15) {
//       const time = new Date(2023, 0, 1, hour, minute);
//       timeOptions.push(formatDate(time, "h:mm a"));
//     }
//   }

//   return (
//     <motion.div
//       className="space-y-6"
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//     >
//       <motion.h1
//         className="text-3xl font-bold text-gray-900"
//         variants={itemVariants}
//       >
//         Manage Newsletters
//       </motion.h1>

//       <motion.div
//         className="space-y-4"
//         variants={itemVariants}
//       >
//         <Card
//           className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
//         >
//           <CardHeader>
//             <CardTitle className="text-2xl">
//               Newsletter Time Settings
//             </CardTitle>
//             <CardDescription
//               className="text-gray-200"
//             >
//               Configure your daily newsletter schedule
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div
//               className="flex items-center space-x-4"
//             >
//               <Clock className="h-6 w-6" />
//               <div>
//                 <p className="text-sm font-medium">
//                   Current Server Time (CT)
//                 </p>
//                 <p className="text-xl font-bold">
//                   {format(currentTime, "h:mm a")}
//                 </p>
//               </div>
//             </div>
//             <div
//               className="flex items-center space-x-4"
//             >
//               <Send className="h-6 w-6" />
//               <div>
//                 <p className="text-sm font-medium">
//                   Auto Email Sent Time (CT)
//                 </p>
//                 <p className="text-xl font-bold">
//                   1:15 PM
//                 </p>
//               </div>
//             </div>
//             <div>
//               <label
//                 className="text-sm font-medium mb-2 block"
//               >
//                 Select New Time for Daily Newsletters (Central Time)
//               </label>
//               <Select
//                 onValueChange={setSelectedTime}
//                 value={selectedTime}
//               >
//                 <SelectTrigger
//                   className="w-[180px] bg-white text-gray-900"
//                 >
//                   <SelectValue
//                     placeholder="Select time"
//                   />
//                 </SelectTrigger>
//                 <SelectContent
//                   className="bg-white"
//                 >
//                   {timeOptions.map((time, index) => (
//                     <SelectItem
//                       key={index}
//                       value={time}
//                     >
//                       {time}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </CardContent>
//         </Card>

//         <motion.div
//           className="mt-8"
//           variants={itemVariants}
//         >
//           <h2
//             className="text-2xl font-semibold mb-4"
//           >
//             Upcoming Newsletters
//           </h2>
//           <motion.div
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//             variants={containerVariants}
//           >
//             {futureEmails.map((email, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Card
//                   className={`flex flex-col h-full ${email.color} shadow-lg hover:shadow-xl transition-shadow duration-300`}
//                 >
//                   <CardHeader>
//                     <CardTitle>
//                       {email.title}
//                     </CardTitle>
//                     <CardDescription>
//                       Scheduled for {format(email.date, "MMMM d, yyyy")} at{" "}
//                       {selectedTime ? `${selectedTime} CT` : "1:15 PM CT"}
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent
//                     className="flex-grow flex flex-col"
//                   >
//                     <motion.img
//                       src={email.image}
//                       alt={email.title}
//                       className="w-full h-40 object-cover rounded-md mb-4"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 0.2 }}
//                     />

//                     <p
//                       className="text-sm text-gray-600 flex-grow"
//                     >
//                       {email.message}
//                     </p>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   );
// }
