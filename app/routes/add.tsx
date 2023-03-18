import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { AddSpotForm } from "../components/AddSpotForm";
import type { ErrorCreateSpotForm, Spot } from "../utils/createSpot";
import { createSpot } from "../utils/createSpot";

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const [errors, values] = createSpot(body);
  if (errors) {
    return { errors, values };
  }

  return redirect("/");
}

export default function Add() {
  const actionData = useActionData<{
    errors: ErrorCreateSpotForm;
    values: Spot;
  }>();
  return (
    <Form role="form" method="post" className="max-w-sm mx-auto prose">
      <AddSpotForm errors={actionData?.errors} values={actionData?.values} />
    </Form>
  );
}
