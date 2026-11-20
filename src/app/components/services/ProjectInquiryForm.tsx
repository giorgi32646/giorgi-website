import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "react-router";
import { Loader2 } from "lucide-react";
import { CATEGORIES, categoryBySlug, questionsFor, type Question } from "../../../lib/services-catalog";
import { InquirySelect } from "./InquirySelect";

const FORMSPREE_URL = "https://formspree.io/f/xgobrzaj";

const BUDGETS = [
  "Under $2,000",
  "$2,000–$5,000",
  "$5,000–$10,000",
  "$10,000–$25,000",
  "$25,000–$50,000",
  "$50,000–$100,000",
  "$100,000–$250,000",
  "$250,000–$400,000+",
  "Not Sure Yet",
];

const TIMELINES = [
  "As soon as the scope is agreed",
  "Within 1–3 months",
  "Within 3–6 months",
  "Within 6–12 months",
  "Flexible",
  "Not sure yet",
];

const INDUSTRIES = [
  "Technology",
  "Finance",
  "Healthcare",
  "Real estate",
  "Hospitality",
  "Retail and commerce",
  "Logistics",
  "Education",
  "Professional services",
  "Other",
];

type Status = "idle" | "sending" | "success" | "error";

type Fields = {
  name: string;
  email: string;
  company: string;
  industry: string;
  category: string;
  product: string;
  description: string;
  budget: string;
  timeline: string;
  references: string;
  additional: string;
};

const EMPTY: Fields = {
  name: "",
  email: "",
  company: "",
  industry: "",
  category: "",
  product: "",
  description: "",
  budget: "",
  timeline: "",
  references: "",
  additional: "",
};

export function ProjectInquiryForm({
  idPrefix = "inquiry",
  initialCategory = "",
  initialService = "",
}: {
  idPrefix?: string;
  initialCategory?: string;
  initialService?: string;
}) {
  const [params] = useSearchParams();
  const [fields, setFields] = useState<Fields>({
    ...EMPTY,
    category: initialCategory || params.get("category") || "",
    product: initialService || params.get("service") || "",
  });
  const [extras, setExtras] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  const category = categoryBySlug(fields.category);
  const service = category?.services.find((item) => item.slug === fields.product);
  const questions = useMemo(() => (category && service ? questionsFor(category, service) : category?.questions ?? []), [category, service]);

  const set = (key: keyof Fields, value: string) => {
    setFields((current) => {
      if (key === "category") {
        const nextCategory = categoryBySlug(value);
        const productStillValid = nextCategory?.services.some((item) => item.slug === current.product);
        return { ...current, category: value, product: productStillValid ? current.product : "" };
      }
      return { ...current, [key]: value };
    });
    if (key === "category" || key === "product") setExtras({});
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!fields.name.trim()) next.name = "Full name is required.";
    if (!fields.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) next.email = "Enter a valid email.";
    if (!fields.category) next.category = "Choose a service category.";
    if (!fields.product) next.product = "Choose a product type.";
    if (fields.description.trim().length < 40) next.description = "Describe the project in at least a few sentences.";
    if (!fields.budget) next.budget = "Choose a budget range.";
    if (!fields.timeline) next.timeline = "Choose a timeline.";
    questions.forEach((question) => {
      if (question.required && !extras[question.id]?.trim()) next[question.id] = "This answer is required.";
    });
    return next;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;

    const answerLines = questions.map((question) => `${question.label}: ${extras[question.id] || ""}`);
    const payload = {
      name: fields.name.trim(),
      email: fields.email.trim(),
      company: fields.company.trim(),
      industry: fields.industry,
      serviceCategory: category?.title ?? fields.category,
      productType: service?.name ?? fields.product,
      projectDescription: fields.description.trim(),
      estimatedBudget: fields.budget,
      desiredTimeline: fields.timeline,
      referenceLinks: fields.references.trim(),
      additionalRequirements: fields.additional.trim(),
      serviceAnswers: answerLines.join("\n"),
      _subject: `Project inquiry — ${service?.name ?? "New project"}`,
    };

    setStatus("sending");
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
      setFields(EMPTY);
      setExtras({});
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" style={{ borderTop: "1px solid var(--line)", paddingTop: "1.25rem" }}>
        <h3 className="display" style={{ fontSize: "2rem" }}>Inquiry received.</h3>
        <p className="lede" style={{ marginTop: "0.7rem" }}>The message reached the studio. You will get a reply within one weekday.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Project inquiry" style={{ display: "flex", flexDirection: "column", gap: "1.05rem" }}>
      <div className="form-row" style={{ display: "grid", gap: "1rem" }}>
        <Field id={`${idPrefix}-name`} label="Full name" error={errors.name}>
          <input id={`${idPrefix}-name`} className="field" autoComplete="name" value={fields.name} onChange={(event) => set("name", event.target.value)} />
        </Field>
        <Field id={`${idPrefix}-email`} label="Email" error={errors.email}>
          <input id={`${idPrefix}-email`} className="field" type="email" autoComplete="email" value={fields.email} onChange={(event) => set("email", event.target.value)} />
        </Field>
      </div>
      <div className="form-row" style={{ display: "grid", gap: "1rem" }}>
        <Field id={`${idPrefix}-company`} label="Company name">
          <input id={`${idPrefix}-company`} className="field" autoComplete="organization" value={fields.company} onChange={(event) => set("company", event.target.value)} />
        </Field>
        <Field id={`${idPrefix}-industry`} label="Industry">
          <InquirySelect id={`${idPrefix}-industry`} value={fields.industry} placeholder="Select an industry" options={INDUSTRIES.map((item) => ({ value: item, label: item }))} onChange={(value) => set("industry", value)} />
        </Field>
      </div>
      <div className="form-row" style={{ display: "grid", gap: "1rem" }}>
        <Field id={`${idPrefix}-category`} label="Service category" error={errors.category}>
          <InquirySelect id={`${idPrefix}-category`} value={fields.category} placeholder="Select a category" options={CATEGORIES.map((item) => ({ value: item.slug, label: item.title }))} onChange={(value) => set("category", value)} />
        </Field>
        <Field id={`${idPrefix}-product`} label="Specific product type" error={errors.product}>
          <InquirySelect id={`${idPrefix}-product`} value={fields.product} placeholder={category ? "Select a product" : "Choose a category first"} disabled={!category} options={category?.services.map((item) => ({ value: item.slug, label: item.name })) ?? []} onChange={(value) => set("product", value)} />
        </Field>
      </div>
      {questions.length > 0 && (
        <fieldset style={{ border: "1px solid var(--line)", margin: 0, padding: "1rem", display: "grid", gap: "0.9rem" }}>
          <legend className="kicker" style={{ padding: "0 0.4rem" }}>Questions for this service</legend>
          {questions.map((question) => (
            <QuestionField key={question.id} idPrefix={idPrefix} question={question} value={extras[question.id] ?? ""} error={errors[question.id]} onChange={(value) => setExtras((current) => ({ ...current, [question.id]: value }))} />
          ))}
        </fieldset>
      )}
      <Field id={`${idPrefix}-description`} label="Project description" error={errors.description}>
        <textarea id={`${idPrefix}-description`} className="field" rows={5} value={fields.description} onChange={(event) => set("description", event.target.value)} placeholder="What you are building, who it is for, and what the first release needs to do." style={{ resize: "vertical" }} />
      </Field>
      <div className="form-row" style={{ display: "grid", gap: "1rem" }}>
        <Field id={`${idPrefix}-budget`} label="Estimated budget" error={errors.budget}>
          <InquirySelect id={`${idPrefix}-budget`} value={fields.budget} placeholder="Select a range" options={BUDGETS.map((item) => ({ value: item, label: item }))} onChange={(value) => set("budget", value)} />
        </Field>
        <Field id={`${idPrefix}-timeline`} label="Desired timeline" error={errors.timeline}>
          <InquirySelect id={`${idPrefix}-timeline`} value={fields.timeline} placeholder="Select a timeline" options={TIMELINES.map((item) => ({ value: item, label: item }))} onChange={(value) => set("timeline", value)} />
        </Field>
      </div>
      <Field id={`${idPrefix}-references`} label="Reference links">
        <input id={`${idPrefix}-references`} className="field" value={fields.references} onChange={(event) => set("references", event.target.value)} placeholder="Sites, products, or documents" />
      </Field>
      <Field id={`${idPrefix}-additional`} label="Additional requirements">
        <textarea id={`${idPrefix}-additional`} className="field" rows={3} value={fields.additional} onChange={(event) => set("additional", event.target.value)} style={{ resize: "vertical" }} />
      </Field>
      {status === "error" && (
        <p role="alert" style={{ color: "#f0a3a3", margin: 0 }}>
          The inquiry was not sent. Try again, or email thegiorgilortki@gmail.com.
        </p>
      )}
      <button type="submit" className="btn btn-ink" disabled={status === "sending"} style={{ alignSelf: "flex-start", opacity: status === "sending" ? 0.7 : 1 }}>
        {status === "sending" ? (<><Loader2 size={16} className="animate-spin" aria-hidden="true" /> Sending…</>) : "Request a proposal"}
      </button>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label className="field-label" htmlFor={id}>{label}</label>
      {children}
      {error && <p style={{ color: "#f0a3a3", fontSize: "0.82rem", margin: "0.35rem 0 0" }}>{error}</p>}
    </div>
  );
}

function QuestionField({ idPrefix, question, value, error, onChange }: { idPrefix: string; question: Question; value: string; error?: string; onChange: (value: string) => void }) {
  const id = `${idPrefix}-${question.id}`;
  return (
    <Field id={id} label={question.label} error={error}>
      {question.kind === "select" ? (
        <InquirySelect id={id} value={value} placeholder="Select" options={(question.options ?? []).map((option) => ({ value: option, label: option }))} onChange={onChange} />
      ) : question.kind === "textarea" ? (
        <textarea id={id} className="field" rows={3} placeholder={question.placeholder} value={value} onChange={(event) => onChange(event.target.value)} style={{ resize: "vertical" }} />
      ) : (
        <input id={id} className="field" placeholder={question.placeholder} value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </Field>
  );
}
