import { useToast } from "@/components/ui/use-toast";
import { ServerActionResponse } from "@/lib/types";
import { useTransition } from "react";

function useActionTransition<
  T extends any[],
  Y extends ServerActionResponse<any>
>(action: (...args: T) => Promise<Y>) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const runAction = async (...args: T) => {
    const res: any = await new Promise((resolve, reject) =>
      startTransition(async () => {
        const { data, error } = await action(...args);
        if (error) toast({ title: error });
        resolve(data);
      })
    );
    return res;
  };

  return { isPending, runAction };
}

export default useActionTransition;
