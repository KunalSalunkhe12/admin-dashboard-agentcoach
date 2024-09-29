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
import {
  format,
  addDays,
  parse,
  format as formatDate,
  addWeeks,
} from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Send } from "lucide-react";
import { getNewsletterPageData } from "@/functions/getNewsLatterPageData";
import Loading from "@/components/Loading";
import { changeAutoEmailSentTime } from "@/functions/changeAutoEmailSentTime";
import { Button } from "@/components/ui/button";
import { setEmailSentDays } from "@/functions/setEmailSendDays";
import { getSentEmailDays } from "@/functions/getSentEmailDays";

export default function Newsletters() {
  const [selectedTime, setSelectedTime] = useState("1:00 PM");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTimeZone, setSelectedTimeZone] = useState("America/Chicago");
  const [daysReturned, setDaysReturned] = useState([]);
  const [data, setData] = useState({
    DailyEmailTemplet: [],
    serverCurrentTime: "4:53 PM",
    emailSentTime: "",
  });
  const [days, setDays] = useState([
    { name: "Sunday", isSelected: false },
    { name: "Monday", isSelected: false },
    { name: "Tuesday", isSelected: false },
    { name: "Wednesday", isSelected: false },
    { name: "Thursday", isSelected: false },
    { name: "Friday", isSelected: false },
    { name: "Saturday", isSelected: false },
  ]);

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

  const timeZones = [
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "America/Anchorage", label: "Alaska Time (AKT)" },
    { value: "Pacific/Honolulu", label: "Hawaii-Aleutian Time (HAT)" },
    { value: "America/Phoenix", label: "Arizona Time (AZT)" },
    { value: "America/Puerto_Rico", label: "Atlantic Time (AT)" },
    { value: "Pacific/Guam", label: "Chamorro Time (ChST)" },
    { value: "Pacific/Samoa", label: "Samoa Time (SST)" },
    { value: "Europe/London", label: "British Summer Time (BST)" },
    { value: "Europe/Paris", label: "Central European Time (CET)" },
    { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
    { value: "Australia/Sydney", label: "Australian Eastern Time (AET)" },
    { value: "Asia/Dubai", label: "Gulf Standard Time (GST)" },
  ];

  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const time = new Date(2023, 0, 1, hour, minute);
      timeOptions.push(format(time, "h:mm a"));
    }
  }

    useEffect(() => {
      // Update auto email time when time zone changes
      const newAutoEmailTime = format(
        new Date().setHours(13, 15, 0, 0),
        "h:mm a"
      );
      // setAutoEmailTime(newAutoEmailTime);
    }, [selectedTimeZone]);

  const handleSetTimeZone = (e) => {
    try {
      setSelectedTimeZone(e);
    } catch (error) {}
  };

  const handleUpdate = () => {
    const selectedDays = days
      .filter((day) => day.isSelected)
      .map((day) => day.name);
    setEmailSentDays(selectedDays, setLoading, setError, setDaysReturned);
  };

  const convertDysArrayToDayObject = (serverDays) => {
    const result = days.map((day) => ({
      name: day.name,
      isSelected: serverDays.includes(day.name),
    }));
    setDays(result);
  };

  const handleDayToggle = (index) => {
    const newDays = [...days];
    newDays[index].isSelected = !newDays[index].isSelected;
    setDays(newDays);
  };

  const handleOnChangeTime = async (e) => {
    setSelectedTime(e);
    changeAutoEmailSentTime(e, setLoading, setError);
  };

  useEffect(() => {
    if (daysReturned.length == 0) return;
    convertDysArrayToDayObject(daysReturned);
  }, [daysReturned]);

  const fetchData = async () => {
    await getSentEmailDays(setDaysReturned, setLoading, setError);
    await getNewsletterPageData(setData, setLoading, setError);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

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
            <CardTitle className="text-2xl">Newsletter Time Settings</CardTitle>
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
                <p className="text-sm font-medium">Auto Email Sent Time (CT)</p>
                <p className="text-xl font-bold">{data.emailSentTime}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Select Time Zone
              </label>
              <Select
                onValueChange={(e) => handleSetTimeZone(e)}
                value={selectedTimeZone}
              >
                <SelectTrigger className="w-full bg-white text-gray-900">
                  <SelectValue placeholder="Select time zone" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {timeZones.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            <div className="space-y-2">
              <p className="text-sm font-medium">Select Days for Newsletter</p>
              <div className="flex flex-wrap gap-4">
                {days.map((day, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-2"
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className={`w-6 h-6 rounded-md border-2 border-white flex items-center justify-center cursor-pointer ${
                        day.isSelected ? "bg-white" : "bg-transparent"
                      }`}
                      onClick={() => handleDayToggle(index)}
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    >
                      <AnimatePresence>
                        {day.isSelected && (
                          <motion.svg
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="w-4 h-4 text-purple-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </motion.svg>
                        )}
                      </AnimatePresence>
                    </motion.div>
                    <label
                      htmlFor={`day-${index}`}
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      {day.name}
                    </label>
                  </motion.div>
                ))}
              </div>
            </div>
            <Button
              onClick={handleUpdate}
              className="w-full bg-orange-600 hover:bg-orange-500"
            >
              Update Settings
            </Button>
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

// import React, { useState, useEffect } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { format, addDays } from "date-fns";
// import { motion, AnimatePresence } from "framer-motion";
// import { Clock, Send, Check } from "lucide-react";
// import { Button } from "@/components/ui/button";

// export default function Newsletters() {
//   const [selectedTime, setSelectedTime] = useState("");
//   const [futureEmails, setFutureEmails] = useState([]);
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [selectedTimeZone, setSelectedTimeZone] = useState("America/Chicago");
//   const [autoEmailTime, setAutoEmailTime] = useState("1:15 PM");
//   const [days, setDays] = useState([
//     { name: "Sunday", isSelected: false },
//     { name: "Monday", isSelected: false },
//     { name: "Tuesday", isSelected: false },
//     { name: "Wednesday", isSelected: false },
//     { name: "Thursday", isSelected: false },
//     { name: "Friday", isSelected: false },
//     { name: "Saturday", isSelected: false },
//   ]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);

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

//   useEffect(() => {
//     // Update auto email time when time zone changes
//     const newAutoEmailTime = format(
//       new Date().setHours(13, 15, 0, 0),
//       "h:mm a",
//     );
//     setAutoEmailTime(newAutoEmailTime);
//   }, [selectedTimeZone]);

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
//       timeOptions.push(format(time, "h:mm a"));
//     }
//   }

//   const handleDayToggle = (index) => {
//     const newDays = [...days];
//     newDays[index].isSelected = !newDays[index].isSelected;
//     setDays(newDays);
//   };

//   const handleUpdate = () => {
//     console.log("Updated days:", days);
//     console.log("Selected time:", selectedTime);
//     console.log("Selected time zone:", selectedTimeZone);
//   };

//   const timeZones = [
//     { value: "America/New_York", label: "Eastern Time (ET)" },
//     { value: "America/Chicago", label: "Central Time (CT)" },
//     { value: "America/Denver", label: "Mountain Time (MT)" },
//     { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
//     { value: "America/Anchorage", label: "Alaska Time (AKT)" },
//     { value: "Pacific/Honolulu", label: "Hawaii-Aleutian Time (HAT)" },
//     { value: "America/Phoenix", label: "Arizona Time (AZT)" },
//     { value: "America/Puerto_Rico", label: "Atlantic Time (AT)" },
//     { value: "Pacific/Guam", label: "Chamorro Time (ChST)" },
//     { value: "Pacific/Samoa", label: "Samoa Time (SST)" },
//     { value: "Europe/London", label: "British Summer Time (BST)" },
//     { value: "Europe/Paris", label: "Central European Time (CET)" },
//     { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
//     { value: "Australia/Sydney", label: "Australian Eastern Time (AET)" },
//     { value: "Asia/Dubai", label: "Gulf Standard Time (GST)" },
//   ];

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
//                   Current Server Time
//                 </p>
//                 <p className="text-xl font-bold">
//                   {format(currentTime, "h:mm:ss a")}
//                 </p>
//               </div>
//             </div>
//             <div
//               className="flex items-center space-x-4"
//             >
//               <Send className="h-6 w-6" />
//               <div>
//                 <p className="text-sm font-medium">
//                   Auto Email Sent Time
//                 </p>
//                 <p className="text-xl font-bold">
//                   {autoEmailTime}
//                 </p>
//               </div>
//             </div>
//             <div>
//               <label
//                 className="text-sm font-medium mb-2 block"
//               >
//                 Select Time Zone
//               </label>
//               <Select
//                 onValueChange={setSelectedTimeZone}
//                 value={selectedTimeZone}
//               >
//                 <SelectTrigger
//                   className="w-full bg-white text-gray-900"
//                 >
//                   <SelectValue
//                     placeholder="Select time zone"
//                   />
//                 </SelectTrigger>
//                 <SelectContent
//                   className="bg-white"
//                 >
//                   {timeZones.map((tz) => (
//                     <SelectItem
//                       key={tz.value}
//                       value={tz.value}
//                     >
//                       {tz.label}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <label
//                 className="text-sm font-medium mb-2 block"
//               >
//                 Select New Time for Daily Newsletters
//               </label>
//               <Select
//                 onValueChange={setSelectedTime}
//                 value={selectedTime}
//               >
//                 <SelectTrigger
//                   className="w-full bg-white text-gray-900"
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
//             <div className="space-y-2">
//               <p className="text-sm font-medium">
//                 Select Days for Newsletter
//               </p>
//               <div
//                 className="flex flex-wrap gap-4"
//               >
//                 {days.map((day, index) => (
//                   <motion.div
//                     key={index}
//                     className="flex items-center space-x-2"
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <motion.div
//                       className={`w-6 h-6 rounded-md border-2 border-white flex items-center justify-center cursor-pointer ${
//                         day.isSelected ? "bg-white" : "bg-transparent"
//                       }`}
//                       onClick={() => handleDayToggle(index)}
//                       whileHover={{ scale: 1.1 }}
//                       transition={{
//                         type: "spring",
//                         stiffness: 500,
//                         damping: 30,
//                       }}
//                     >
//                       <AnimatePresence>
//                         {day.isSelected && (
//                           <motion.svg
//                             initial={{ scale: 0 }}
//                             animate={{ scale: 1 }}
//                             exit={{ scale: 0 }}
//                             className="w-4 h-4 text-purple-600"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M5 13l4 4L19 7"
//                             />
//                           </motion.svg>
//                         )}
//                       </AnimatePresence>
//                     </motion.div>
//                     <label
//                       htmlFor={`day-${index}`}
//                       className="text-sm font-medium leading-none cursor-pointer"
//                     >
//                       {day.name}
//                     </label>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//             <Button
//               onClick={handleUpdate}
//               className="w-full"
//             >
//               Update Settings
//             </Button>
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
//                       {selectedTime ? selectedTime : autoEmailTime}
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
