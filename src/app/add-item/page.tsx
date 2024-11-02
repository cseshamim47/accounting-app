'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from 'next/navigation'
import { createClient } from "@/utils/supabase/client";

const page = () => {
  const router = useRouter()
  const [description, setDescription] = useState('')
  const [account, setAccount] = useState('')
  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [tax, setTax] = useState('')
  const [type, setType] = useState('service')

  const handleSave = async () => {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from("items")
      .insert([
        { 
          description, 
          account, 
          price: Number(price),
          discount: discount ? Number(discount) : null,
          tax,
          type
        }
      ])
      .select()

    if (!error) {
      toast.success('Successfully created!');
      router.push('/items')
    }
  }

  return (
    <div className="m-6 w-full space-y-4">
      <div className="flex justify-between">
        <p className="text-4xl font-bold">Add New Item</p>
        <div className="space-x-2">
          <Button variant={"outline"} onClick={()=>router.back()}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>

      <div className="w-full dark:bg-slate-900 bg-gray-100 rounded-lg p-6 space-y-4">
        <p className="text-2xl">General Information</p>
        <div className="w-full dark:bg-inherit bg-white rounded-lg p-4 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 ">
              <div>Description *</div>
              <Input 
                type="text" 
                placeholder="Description" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div>Account *</div>
              <Select value={account} onValueChange={setAccount}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Revenue</SelectLabel>
                    <SelectItem value="interest">Interest Income</SelectItem>
                    <SelectItem value="other">Other Revenue</SelectItem>
                    <SelectItem value="gain">
                      Realised Gain on Foreign Exchange
                    </SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2 ">
              <div>Price *</div>
              <Input 
                type="number" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="space-y-2 ">
              <div>Discount</div>
              <Input 
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
            <div className="space-y-2 ">
              <div>Value Added Tax</div>
              <Select value={tax} onValueChange={setTax}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Vat</SelectLabel>
                    <SelectItem value="VAT19">VAT 19</SelectItem>
                    <SelectItem value="VAT9">VAT 9</SelectItem>
                    <SelectItem value="VAT5">VAT 5</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 ">
              <div>Type of Item</div>
              <RadioGroup 
                value={type} 
                onValueChange={setType}
                defaultValue="service" 
                className="flex h-9"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="service" id="r1" />
                  <Label htmlFor="r1">Service</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="good" id="r2" />
                  <Label htmlFor="r2">Good</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
