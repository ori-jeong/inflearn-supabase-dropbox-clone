"use server";

import { createServerSupabaseClient } from "utils/supabase/server";
import { v4 as uuidv4 } from "uuid";

function handleError(error) {
  if (error) {
    console.log(error);
    throw error;
  }
}

// 첨부한 파일 데이터가 넘어옴
export async function uploadFile(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  // const file = formData.get("file") as File;
  // const { data, error } = await supabase.storage
  //   .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
  //   .upload(file.name, file, { upsert: true }); // path, fileBody, fileOptions
  // // upsert: file.name이 존재하지 않으면 insert, file.name이 존재하면 update
  // handleError(error);
  // return data;

  // formData.entries(): 넘어온 form 데이터가 iterator로 들어옴 / 출력: Object [FormData Iterator]{}
  // Array.from(): iterator를 array 형태로 만들어줌
  const files = Array.from(formData.entries()).map(
    ([name, file]) => file as File
  );
  // all(): 여러 파일을 한 번에 업로드 진행하기 위해 사용
  const results = await Promise.all(
    files.map((file) => {
      // const ext = file.name.split(".").pop(); // 확장자 추출
      //  const fileName = `${uuidv4()}.${ext}`; // UUID 기반 파일명 생성
      console.log(file.name);
      supabase.storage
        .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
        .upload(file.name, file, { upsert: true });
    })
  );
  return results;
}

export async function searchFiles(search: string = "") {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
    .list(null, { search }); // path, options, parameters
  handleError(error);
  return data;
}

export async function deleteFile(fileName: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
    .remove([fileName]);

  handleError(error);

  return data;
}
