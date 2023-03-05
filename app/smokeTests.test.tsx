import { render, screen } from "@testing-library/react";

const SmokeScreen = () => {
    return <div>Hello world</div>
}
describe("Smoke test", () => {
    it("should pass", () => {
        expect(() => render(<SmokeScreen/>)).not.toThrow();
        expect(screen.getByText("Hello world")).toBeInTheDocument();
    })
})