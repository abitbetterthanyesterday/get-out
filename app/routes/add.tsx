import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { AddSpotForm } from "~/components/AddSpotForm";
import { DIContainer } from "~/db.server";
import type { Spot } from "~/models/spot";
import type { ErrorCreateSpotForm } from "~/services/createSpot";
import { createSpotService } from "~/services/createSpot";

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const [errors, values] = await createSpotService(
    body,
    DIContainer.getInstance().spotRepository
  );
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
