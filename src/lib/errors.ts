import { Types } from "@google-labs/breadboard-ui";

export const handleError = (onError?: Types.BreadboardErrorHandler) => (error: Types.BreadboardElementError) => { 
    if (onError) {
      return onError(error);
    }
    console.error(`There was an error.`, error);
  };