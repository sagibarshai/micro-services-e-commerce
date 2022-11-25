export const apiError = (
     err: any,
     setServerError: (returendErr: string | null) => void
) => {
     console.log(err);
     let returendErr = "";
     if (Array.isArray(err?.response?.data?.errors)) {
          console.log(err.response.data.errors!);
          for (let error of err.response.data.errors!) {
               console.log(error);
               returendErr += error.message;
          }
     } else setServerError(`Server error ${err.code}`);
     setServerError(returendErr);
     setTimeout(() => setServerError(null), 5000);
};
