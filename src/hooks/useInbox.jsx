import { useEffect, useState, useCallback } from "react";

const useInbox = (url) => {
  const [mails, setMails] = useState([]);

  const fetchInbox = useCallback(async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data) {
        const arr = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setMails(arr);
      } else {
        setMails([]);
      }
    } catch (err) {
      console.log("Error fetching inbox:", err);
    }
  }, [url]);

  useEffect(() => {
    Promise.resolve().then(() => fetchInbox());

    const interval = setInterval(fetchInbox, 2000);

    return () => clearInterval(interval);
  }, [fetchInbox]);

  return mails;
};

export default useInbox;
