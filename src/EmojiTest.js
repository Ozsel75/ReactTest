import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App Tests", ()=> {
    beforeEach(()=> {
        render (<App />);
    })
    test("Render the Header comp.", ()=>{
        // Check header
        expect(screen.getByText("Emoji Search")).toBeInTheDocument();
        // Verify header Emojis
        const img = screen.getAllByRole("img");
        expect(img[0]).toHaveAccessibleName("grin-cat");
        expect(img[1]).toHaveAccessibleName("grinning-cat");
    } );

    test("the emoji list is rendered at the start", ()=> {
        expect(screen.getAllByText("Click to copy emoji")).toHaveLength(20);
    })

    test("the emoji list is re-rendered by filter", ()=> {
        const input = screen.getByRole("textbox");
        fireEvent.change(input, {target: { value: "snow"}});
        expect(screen.getAllByText(/snow/i)).toHaveLength(6);

    })

    test("clicking the emoji copies", async()=> {
        const emoji = screen.getByText("100");
        userEvent.click(emoji);
        const text = "100";
        userEvent.paste(emoji, text);
        expect(emoji).toHaveTextContent(text);

    })
})


