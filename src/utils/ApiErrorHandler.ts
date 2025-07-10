/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";



const ApiErrorHandler = (err: any)=> {
    // Extracting error message from the API response
    if (err?.data?.message) {
        // Display the specific error message from the response
        toast.error(err.data.message);
      } else if (err?.message) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong! Please try again.");
      }

};

export default ApiErrorHandler;