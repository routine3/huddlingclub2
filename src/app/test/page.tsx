import type { ReactNode } from "react";
import AttendanceBadge from "@/components/AttendanceBadge";
import Button from "@/components/Button";
import CopyLinkField from "@/components/CopyLinkField";
import EmptyState from "@/components/EmptyState";
import IconCheck from "@/components/IconCheck";
import IconMinus from "@/components/IconMinus";
import IconNone from "@/components/IconNone";
import IconPlus from "@/components/IconPlus";
import Image from "@/components/Image";
import InfoRow from "@/components/InfoRow";
import Input from "@/components/Input";
import InputField from "@/components/InputField";
import InvitationCover from "@/components/InvitationCover";
import Label from "@/components/Label";
import NavBar from "@/components/NavBar";
import Radio from "@/components/Radio";
import RadioOption from "@/components/RadioOption";
import ResponseRowTrue from "@/components/ResponseRowTrue";
import RSVPCard from "@/components/RSVPCard";
import SectionHeader from "@/components/SectionHeader";
import StatCard from "@/components/StatCard";
import StepButton from "@/components/StepButton";
import Stepper from "@/components/Stepper";
import SuccessIcon from "@/components/SuccessIcon";
import Textarea from "@/components/Textarea";
import TextareaField from "@/components/TextareaField";

const buttonSizes = ["sm", "md", "lg"] as const;
const buttonStates = ["default", "hover", "disabled"] as const;

const stateLabels = {
  default: "Default",
  hover: "Hover",
  disabled: "Disabled",
} as const;

function ComponentSection({ title, children }: Readonly<{ title: string; children: ReactNode }>) {
  return (
    <section className="flex flex-col gap-stack-lg rounded-card bg-surface-default p-stack-lg">
      <h2 className="typography-heading-md text-text-primary">{title}</h2>
      {children}
    </section>
  );
}

function Sample({ label, children }: Readonly<{ label: string; children: ReactNode }>) {
  return (
    <div className="flex flex-col gap-inline-md">
      <span className="typography-caption-md text-text-tertiary">{label}</span>
      {children}
    </div>
  );
}

export default function TestPage() {
  return (
    <main className="min-h-screen bg-background-subtle px-page-horizontal py-section">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-section-lg">
        <header className="flex flex-col gap-stack-sm">
          <h1 className="typography-heading-lg text-text-primary">컴포넌트 테스트</h1>
          <p className="typography-body-md text-text-secondary">
            Figma를 기준으로 만든 컴포넌트와 상태를 한눈에 확인하는 페이지입니다.
          </p>
        </header>

        <ComponentSection title="Button">
          <div className="flex flex-col gap-stack-lg">
            {buttonSizes.map((size) => (
              <div className="flex flex-col gap-stack-md" key={size}>
                <h3 className="typography-label-lg text-text-primary">Size: {size.toUpperCase()}</h3>
                <div className="flex flex-wrap items-end gap-stack-lg">
                  {buttonStates.map((state) => (
                    <Sample key={state} label={stateLabels[state]}>
                      <Button size={size} state={state}>Button</Button>
                    </Sample>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ComponentSection>

        <ComponentSection title="Icons · Image">
          <div className="flex flex-wrap items-start gap-section">
            <Sample label="icon/none">
              <span className="inline-flex w-fit rounded-control border border-border-subtle bg-background-subtle p-inline-md"><IconNone /></span>
            </Sample>
            <Sample label="icon/check"><IconCheck /></Sample>
            <Sample label="icon/plus"><IconPlus /></Sample>
            <Sample label="icon/minus"><IconMinus /></Sample>
            <Sample label="Image · flag"><Image alt="깃발" type="flag" /></Sample>
            <Sample label="Image · character"><Image alt="초대장을 든 캐릭터" type="character" /></Sample>
          </div>
        </ComponentSection>

        <ComponentSection title="Label · Radio · Badge">
          <div className="flex flex-wrap items-start gap-section">
            <Sample label="Label"><Label as="span">이름</Label></Sample>
            <Sample label="Label · required"><Label as="span" required>이름</Label></Sample>
            <Sample label="Radio · default"><Radio /></Sample>
            <Sample label="Radio · selected"><Radio state="selected" /></Sample>
            <Sample label="Radio · disabled"><Radio state="disabled" /></Sample>
            <Sample label="RadioOption"><RadioOption label="참석" readOnly /></Sample>
            <Sample label="RadioOption · selected"><RadioOption checked label="불참" readOnly /></Sample>
            <Sample label="AttendanceBadge · yes"><AttendanceBadge status="yes" /></Sample>
            <Sample label="AttendanceBadge · no"><AttendanceBadge status="no" /></Sample>
          </div>
        </ComponentSection>

        <ComponentSection title="InputField · TextareaField">
          <div className="grid gap-stack-lg md:grid-cols-3">
            <Sample label="InputField · default"><InputField placeholder="placeholder" /></Sample>
            <Sample label="InputField · focus"><InputField placeholder="placeholder" state="focus" /></Sample>
            <Sample label="InputField · active"><InputField readOnly state="active" value="입력된 내용" /></Sample>
            <Sample label="TextareaField · default">
              <TextareaField className="h-[var(--size-textarea-short)]" placeholder="초대 글을 적어주세요" />
            </Sample>
            <Sample label="TextareaField · focus">
              <TextareaField className="h-[var(--size-textarea-short)]" placeholder="초대 글을 적어주세요" state="focus" />
            </Sample>
            <Sample label="TextareaField · active">
              <TextareaField className="h-[var(--size-textarea-short)]" readOnly state="active" value="입력된 초대 글입니다." />
            </Sample>
          </div>
        </ComponentSection>

        <ComponentSection title="Input · Textarea">
          <div className="flex flex-wrap items-start gap-section">
            <Input helper="초대장에 표시되는 이름이에요." label="이름" placeholder="이름을 입력해 주세요" showHelper />
            <Textarea helper="엔터로 줄을 나눌 수 있어요" label="초대 글" placeholder="게스트에게 전할 초대 글을 적어주세요" rows="4" showHelper />
            <Textarea label="간단한 메모" placeholder="메모를 적어주세요" rows="2" />
          </div>
        </ComponentSection>

        <ComponentSection title="StepButton · Stepper · SuccessIcon">
          <div className="flex flex-wrap items-end gap-section">
            <Sample label="StepButton · default"><StepButton /></Sample>
            <Sample label="StepButton · disabled"><StepButton state="disabled" /></Sample>
            <Sample label="Stepper · 0명"><Stepper value={0} /></Sample>
            <Sample label="Stepper · 2명"><Stepper value={2} /></Sample>
            <Sample label="SuccessIcon"><SuccessIcon /></Sample>
          </div>
        </ComponentSection>

        <ComponentSection title="NavBar · SectionHeader · InfoRow">
          <div className="flex flex-col gap-section">
            <NavBar title="초대장 만들기" />
            <SectionHeader description="소중한 분들을 초대합니다." subtitle="Huddling Club" title="함께해 주세요" />
            <div className="flex flex-wrap gap-stack-lg rounded-card bg-surface-inverse p-stack-lg">
              <InfoRow label="일시" value="2026년 11월 14일" />
            </div>
            <InfoRow label="참석 여부" type="spread" value="참석" />
          </div>
        </ComponentSection>

        <ComponentSection title="StatCard · ResponseRow/true · EmptyState">
          <div className="flex flex-wrap items-start gap-stack-lg">
            <StatCard label="참석" value="2명" />
            <StatCard highlight label="전체" value="3명" />
            <ResponseRowTrue />
            <EmptyState />
          </div>
        </ComponentSection>

        <ComponentSection title="CopyLinkField"><CopyLinkField /></ComponentSection>

        <ComponentSection title="InvitationCover">
          <div className="overflow-x-auto"><InvitationCover /></div>
        </ComponentSection>

        <ComponentSection title="RSVPCard">
          <div className="flex flex-wrap items-start gap-section">
            <RSVPCard />
            <RSVPCard attendance="yes" companionCount={1} name="김허들" state="done" />
          </div>
        </ComponentSection>
      </div>
    </main>
  );
}
