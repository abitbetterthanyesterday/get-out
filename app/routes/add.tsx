import type { ActionArgs } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { AddSpotForm } from "../components/AddSpotForm";
import { createSpot } from "../utils/createSpot";

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const [errors, _] = createSpot(body);
  return { errors };
}

export default function Add() {
  const actionData = useActionData<typeof action>();
  return (
    <form role="form" method="post" className="max-w-sm mx-auto prose">
      <AddSpotForm errors={actionData?.errors} />
    </form>
  );
}
