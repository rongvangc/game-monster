import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export const AlertError = ({ errMessage }: { errMessage: string }) => {
  return errMessage ? (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{errMessage}</AlertDescription>
    </Alert>
  ) : null;
};
