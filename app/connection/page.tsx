import React from "react";

export default function connection() {
  async function create(formData: FormData){
    'use server';
  }
  return <form action="{create}">  </form>
}
