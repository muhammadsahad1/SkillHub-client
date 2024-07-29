import React from "react";
import { Field, Switch } from "@headlessui/react";

const CheckBoxBtn = ({ label, isChecked, onChange }) => {
  return (
    <Field className=" flex justify-between mt-10">
      <label className="font-bold text-zinc-600">{label}</label>
      <Switch
        checked={isChecked}
        onChange={onChange}
        className="group inline-flex h-4 w-11 items-center rounded-full bg-gray-300 transition data-[checked]:bg-blue-400"
      >
        <span className="size-5 translate-x-1 rounded-full items-center bg-zinc-800 transition group-data-[checked]:translate-x-6"></span>
      </Switch>
    </Field>
  );
};

export default CheckBoxBtn;
