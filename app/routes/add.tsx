import { Form, useActionData } from "@remix-run/react";

import type { ActionArgs } from "@remix-run/node";
import { AddSpotForm } from "~/components/AddSpotForm";
import type { ErrorCreateSpotForm } from "~/services/createSpot";
import type { Spot } from "~/models/spot.server";
import { createSpotService } from "~/services/createSpot";
import { redirect } from "@remix-run/node";

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const [errors, values] = await createSpotService(body);
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
