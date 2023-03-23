import { Form, useActionData } from "@remix-run/react";
import { Prisma, Spot } from "@prisma/client";

import type { ActionArgs } from "@remix-run/node";
import { AddSpotForm } from "~/components/AddSpotForm";
import type { ErrorCreateSpotForm } from "~/services/createSpotService";
import { createSpotService } from "~/services/createSpotService";
import { redirect } from "@remix-run/node";

export async function action({ request }: ActionArgs) {
  const body = await request.formData();
  const [errors, values] = await createSpotService(body);
  if (errors) {
    return { errors, values };
  }

  return redirect("/");
}

// type unwrapp promise

export default function Add() {
  const actionData = useActionData<{
    errors: ErrorCreateSpotForm;
    values: Prisma.SpotCreateInput;
  }>();
  return (
    <Form
      role="form"
      method="post"
      className="min-w-[50%] mx-auto prose max-w-none"
    >
      <AddSpotForm errors={actionData?.errors} values={actionData?.values} />
    </Form>
  );
}
