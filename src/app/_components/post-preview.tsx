"use client";

import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { TeamMemberModal } from "@/app/_components/team-member-modal";
import { useState } from "react";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Team member data (same as in about page)
  const teamMembers = [
    {
      name: "Driss",
      image: "/assets/blog/authors/Driss.png",
      shortDescription: "...",
      extendedDescription: "..."
    },
    {
      name: "Bruno",
      image: "/assets/blog/authors/Bruno.png",
      shortDescription: "...",
      extendedDescription: "..."
    },
    {
      name: "Oleg",
      image: "/assets/blog/authors/Oleg.png",
      shortDescription: "...",
      extendedDescription: "..."
    },
  ];

  const openModal = (member: any) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  const handleAvatarClick = () => {
    const member = teamMembers.find(m => m.name === author.name);
    if (member) {
      openModal(member);
    }
  };

  return (
    <>
      <div>
        <div className="mb-5">
          <CoverImage slug={slug} title={title} src={coverImage} />
        </div>
        <h3 className="text-2xl mb-3 leading-snug font-normal">
          <Link href={`/posts/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>
        <div className="text-lg mb-4">
          <DateFormatter dateString={date} />
        </div>
        <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
        <div onClick={handleAvatarClick} className="cursor-pointer">
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
      
      <TeamMemberModal
        isOpen={isModalOpen}
        onClose={closeModal}
        member={selectedMember}
      />
    </>
  );
}