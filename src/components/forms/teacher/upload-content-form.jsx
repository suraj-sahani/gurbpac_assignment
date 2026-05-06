"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "@/hooks/use-session";
import { uploadSchema } from "@/lib/schema";
import { uploadContent } from "@/lib/services/content.service";
import { getImagePreviewUrl } from "@/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { ImageAdd02Icon } from "@hugeicons/core-free-icons/index";
import { Alert02Icon, Upload06Icon } from "@hugeicons/core-free-icons/index";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SUBJECTS = [
  "Mathematics",
  "Science",
  "History",
  "English",
  "Art",
  "PE",
  "Music",
];

export function UploadForm() {
  const router = useRouter();
  const { session, error } = useSession();
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      title: "",
      subject: "",
      description: "",
      startTime: new Date().toISOString().split("T")[0],
      endTime: new Date(Date.now() + 86400000).toISOString().split("T")[0],
      rotationDuration: 30,
    },
  });

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      form.setValue("file", file);

      // Generate preview
      const previewUrl = await getImagePreviewUrl(file);
      setPreview(previewUrl);
    } catch (err) {
      console.error("Error processing file:", err);
    }
  };

  async function onSubmit(data) {
    console.dir({ errors: form.formState.errors, sesion_error: error });
    if (!session?.user.id) {
      toast.error("Unauthorized");
      return;
    }
    try {
      setIsSubmitting(true);

      await uploadContent({
        teacherId: session.user.id,
        teacherName: session.user.name,
        title: data.title,
        subject: data.subject,
        description: data.description,
        fileUrl: preview || "/placeholder.jpg",
        fileType: "image",
        startTime: new Date(data.startTime).toISOString(),
        endTime: new Date(data.endTime).toISOString(),
        rotationDuration: data.rotationDuration,
        status: "pending",
      });

      // Reset form
      form.reset();
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      toast.success("Product Created Successfully.");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to upload content";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="space-y-5"
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field className="space-y-1.5 sm:col-span-2">
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input id="title" {...form.register("title")} />
          {form.formState.errors.title && (
            <p className="text-xs text-destructive">
              {form.formState.errors.title.message}
            </p>
          )}
        </Field>

        <Field className="space-y-1.5">
          <FieldLabel>Subject</FieldLabel>
          <Select
            value={form.watch("subject")}
            onValueChange={(v) =>
              form.setValue("subject", v, { shouldValidate: true })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {SUBJECTS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.subject && (
            <p className="text-xs text-destructive">
              {form.formState.errors.subject.message}
            </p>
          )}
        </Field>

        <Field className="space-y-1.5">
          <FieldLabel htmlFor="rotation">Rotation duration (sec)</FieldLabel>
          <Input
            id="rotation"
            type="number"
            min={1}
            {...form.register("rotationDuration")}
          />
        </Field>

        <Field className="space-y-1.5 sm:col-span-2">
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea
            id="description"
            rows={3}
            {...form.register("description")}
          />
        </Field>

        <Field className="space-y-1.5">
          <FieldLabel htmlFor="start">Start time</FieldLabel>
          <Input
            id="start"
            type="datetime-local"
            {...form.register("startTime")}
          />
          {form.formState.errors.startTime && (
            <p className="text-xs text-destructive">
              {form.formState.errors.startTime.message}
            </p>
          )}
        </Field>
        <Field className="space-y-1.5">
          <FieldLabel htmlFor="end">End time</FieldLabel>
          <Input id="end" type="datetime-local" {...form.register("endTime")} />
          {form.formState.errors.endTime && (
            <p className="text-xs text-destructive">
              {form.formState.errors.endTime.message}
            </p>
          )}
        </Field>
      </div>

      <Field className="space-y-1.5">
        <FieldLabel>File</FieldLabel>
        <Card className={"py-0 ring-0"}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif"
            onChange={handleFileChange}
            disabled={isSubmitting}
            className="hidden"
            id="fileInput"
          />
          {preview ? (
            <div className="space-y-1">
              <div className="relative w-full h-30 bg-muted rounded-lg overflow-hidden">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-muted-foreground text-center">
                {form.watch("file")?.name}{" "}
                {(form.watch("file").size / 1024).toFixed(0)} KB
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => fileInputRef.current?.click()}
                disabled={isSubmitting}
              >
                Change File
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isSubmitting}
              className="w-full h-30 flex flex-col items-center justify-center gap-2 hover:bg-muted rounded-lg transition-colors"
            >
              <HugeiconsIcon
                icon={ImageAdd02Icon}
                size={24}
                color="currentColor"
                strokeWidth={1.5}
                className="mb-2 h-8 w-8 text-muted-foreground"
              />
              <p className="text-sm font-medium text-foreground">
                Click to upload
              </p>
              <p className="text-xs text-muted-foreground">
                JPG, PNG, or GIF (max 10MB)
              </p>
            </Button>
          )}
        </Card>

        {file && (
          <p className="text-xs text-muted-foreground">
            {file.name} · {(file.size / 1024).toFixed(0)} KB
          </p>
        )}
        {form.formState.errors.file && (
          <p className="text-xs text-destructive">
            {form.formState.errors.file.message}
          </p>
        )}
      </Field>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Spinner />}
          Submit for approval
        </Button>
      </div>
    </form>
  );
}
