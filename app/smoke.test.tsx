import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { vi } from "vitest";


const SmokeScreen = () => {
    axios.get("/mock")
        .then(({data}) => {console.log(data)})
        .catch(e => {console.error(e)})
    return <div>Hello world</div>
}
describe("Smoke test", () => {
    //If this does not pass, the test configuration is broken
    it("should pass", async () => {
        const consoleSpy =vi.spyOn(console, "log")
        expect(() => render(<SmokeScreen/>)).not.toThrow();
        expect(screen.getByText("Hello world")).toBeInTheDocument();
        await waitFor(() => expect(consoleSpy).toHaveBeenCalledWith("Hello world"))
    })

})