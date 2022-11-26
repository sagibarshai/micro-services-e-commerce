export const apiError = (err: any) => {
     console.log(err);
     let returendErr = "";
     if (Array.isArray(err?.response?.data?.errors)) {
          console.log(err.response.data.errors!);
          for (let error of err.response.data.errors!) {
               console.log(error);
               returendErr += error.message;
          }
     } else returendErr = err.message || "some randoommm error";
     console.log(returendErr);
     return returendErr;
};
