import { getAllItems } from "@/utils/db"

export default async function Toggle() {
  // const supabase = await createClient();
  // const { data, error } = await supabase
  //   .from("items")
  //   .insert([{ description: "someValue", account: "otherValue", price: 100, discount:20, tax:"no", type:"yoyo" }])
  //   .select();
    
  const items = await getAllItems()
  console.log(items);
  
  

  return <pre>{JSON.stringify(items, null, 2)}</pre>
}