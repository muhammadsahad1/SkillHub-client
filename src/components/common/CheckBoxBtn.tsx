import React from "react";
import { Field, Switch } from "@headlessui/react";

const CheckBoxBtn = ({ label, isChecked,  onChange }) => {
  return (
    <Field className=" flex justify-between mt-10">
      <label className="font-bold text-zinc-600">{label}</label>
      <Switch
        checked={isChecked}
        onChange={onChange}
        className={`${
          isChecked ? 'bg-blue-400' : 'bg-gray-300'
        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        <span
          className={`${
            isChecked ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </Switch>
    </Field>
  );
};

export default CheckBoxBtn;
