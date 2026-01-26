"use client";

import { useRef, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Theme } from "@/lib/client";
import { Section } from "@/components/section";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupButton,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { GitForkIcon, type GitForkIconHandle } from "@/components/ui/git-fork";
import { PlusIcon, type PlusIconHandle } from "@/components/ui/plus";
import { AtomIcon, type AtomIconHandle } from "@/components/ui/atom";
import {
    BookTextIcon,
    type BookTextIconHandle,
} from "@/components/ui/book-text";
import type { TaskSchema } from "@/lib/client";

export function Catalog({ tasks }: { tasks: TaskSchema[] }) {
    const [activeTab, setActiveTab] = useState<Theme>("информатика");
    const themes: Theme[] = Array.from(
        new Set(tasks.map((task) => task.theme)),
    );
    const gitForkRef = useRef<GitForkIconHandle>(null);
    const plusRef = useRef<PlusIconHandle>(null);
    const atomRef = useRef<AtomIconHandle>(null);
    const bookTextRef = useRef<BookTextIconHandle>(null);

    useEffect(() => {
        gitForkRef.current?.stopAnimation();
        plusRef.current?.stopAnimation();
        atomRef.current?.stopAnimation();
        bookTextRef.current?.stopAnimation();

        switch (activeTab) {
            case "информатика":
                gitForkRef.current?.startAnimation();
                break;
            case "математика":
                plusRef.current?.startAnimation();
                break;
            case "физика":
                atomRef.current?.startAnimation();
                break;
            case "русский":
                bookTextRef.current?.startAnimation();
                break;
        }
    }, [activeTab]);

    return (
        <section id="catalog" className="flex flex-col">
            <InputGroup className="h-12">
                <InputGroupAddon>
                    <Search />
                </InputGroupAddon>
                <InputGroupInput placeholder="Найти задания" />
                <InputGroupButton className="h-full flex gap-3">
                    <Search />
                    <span className="pr-3">Поиск</span>
                </InputGroupButton>
            </InputGroup>
            <Tabs
                defaultValue={"информатика"}
                onValueChange={(value) => setActiveTab(value as Theme)}
            >
                <TabsList className="mt-5 w-full">
                    <TabsTrigger value={"информатика"}>
                        <GitForkIcon ref={gitForkRef} />
                        <span>Информатика</span>
                    </TabsTrigger>
                    <TabsTrigger value={"математика"}>
                        <PlusIcon ref={plusRef} />
                        <span>Математика</span>
                    </TabsTrigger>
                    <TabsTrigger value={"физика"}>
                        <AtomIcon ref={atomRef} />
                        <span>Физика</span>
                    </TabsTrigger>
                    <TabsTrigger value={"русский"}>
                        <BookTextIcon ref={bookTextRef} />
                        <span>Русский язык</span>
                    </TabsTrigger>
                </TabsList>
                {themes.map((theme, i) => (
                    <TabsContent value={theme} className="p-3" key={i}>
                        {Array.from(
                            new Set(tasks.filter(task => task.theme == theme).map((task) => task.subject)),
                        ).map((subject) => (
                            <Section
                                key={subject}
                                title={subject}
                                tasks={tasks.filter(
                                    (task) => task.subject === subject,
                                )}
                            />
                        ))}
                    </TabsContent>
                ))}
            </Tabs>
        </section>
    );
}
