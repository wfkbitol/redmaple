"use client";
import { useReducer } from "react";
import { init, reducer } from "./Header.reducer";
import { useClick, useDismiss, useFloating, useInteractions } from "@floating-ui/react";
import Link from "next/link";

function Header() {
    const [state, dispatch] = useReducer(reducer, init);
    const menuFloating = useFloating({
        open: state.isMenuOpen,
        onOpenChange: handleIsMenuOpenChange,
        placement: "bottom"
    });

    const menuInteraction = useInteractions([useDismiss(menuFloating.context)]);

    function handleIsMenuOpenChange(value: boolean) {
        dispatch({ type: "changeIsMenuOpen", payload: value });
    }

    function handleMenuToggleClick() {
        dispatch({ type: "changeIsMenuOpen", payload: !state.isMenuOpen });
    }

    return (
        <>
            <header ref={menuFloating.refs.setReference} {...menuInteraction.getReferenceProps()} className="h-16 bg-secondary border-b border-border flex flex-row items-center justify-center">
                <div className="grow max-w-6xl grid grid-cols-[auto_1fr_auto] items-center justify-items-center">
                    <div className="col-start-1 row-start-1 flex flex-row items-center gap-2 pl-8">
                        <svg viewBox="0 0 14 14" className="w-8 h-8 text-primary">
                            <use href="/icons.svg#maple" fill="currentColor" />
                        </svg>
                        <h1 className="text-lg font-bold text-primary">RED MAPLE</h1>
                    </div>
                    <div className="col-start-1 col-span-3 row-start-1 flex flex-row items-center justify-center gap-3 max-[800px]:hidden">
                        <Link href="/" className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground">Home</Link>
                        <Link href="/" className="px-4 py-1.5 rounded-full text-secondary-foreground transition-colors hover:bg-muted hover:text-foreground">Blog</Link>
                        <Link href="/" className="px-4 py-1.5 rounded-full text-secondary-foreground transition-colors hover:bg-muted hover:text-foreground">Gallery</Link>
                        <Link href="/" className="px-4 py-1.5 rounded-full text-secondary-foreground transition-colors hover:bg-muted hover:text-foreground">Notes</Link>
                        <Link href="/" className="px-4 py-1.5 rounded-full text-secondary-foreground transition-colors hover:bg-muted hover:text-foreground">Musing</Link>
                    </div>
                    <div className="col-start-3 row-start-1 flex flex-row items-center justify-end gap-4 pr-8">
                        <button className="h-8 w-8 border border-border rounded-full text-muted-foreground flex flex-row justify-center items-center cursor-pointer hover:bg-background hover:text-foreground transition-colors">
                            <svg viewBox="0 0 32 32" className="w-5 h-5">
                                <use href="/icons.svg#moon" fill="currentColor" />
                            </svg>
                        </button>
                        <button className="h-8 w-8 border border-border rounded-full text-muted-foreground flex flex-row justify-center items-center cursor-pointer hover:bg-background hover:text-foreground transition-colors">
                            中
                        </button>
                        <button onClick={handleMenuToggleClick} className="h-8 w-8 border border-border rounded-full text-muted-foreground flex flex-row justify-center items-center cursor-pointer hover:bg-background hover:text-foreground transition-colors min-[800px]:hidden">
                            <svg viewBox="0 0 32 32" className="w-5 h-5">
                                <use href="/icons.svg#menu" fill="currentColor" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>
            {
                state.isMenuOpen &&
                <div ref={menuFloating.refs.setFloating} style={menuFloating.floatingStyles} {...menuInteraction.getFloatingProps()} className="w-full bg-secondary flex flex-col justify-start items-stretch gap-1 py-4 px-8 min-[800px]:hidden">
                    <Link href="/" className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground">Home</Link>
                    <Link href="/" className="px-4 py-1.5 rounded-full text-secondary-foreground transition-colors hover:text-foreground">Blog</Link>
                    <Link href="/" className="px-4 py-1.5 rounded-full text-secondary-foreground transition-colors hover:text-foreground">Gallery</Link>
                    <Link href="/" className="px-4 py-1.5 rounded-full text-secondary-foreground transition-colors hover:text-foreground">Notes</Link>
                    <Link href="/" className="px-4 py-1.5 rounded-full text-secondary-foreground transition-colors hover:text-foreground">Musing</Link>
                </div>
            }
        </>
    )
}

export default Header;