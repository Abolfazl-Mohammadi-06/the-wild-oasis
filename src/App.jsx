import styled, {css} from "styled-components";
import GlobalStyle from "./styles/GlobalStyle.js";
import Button from "./ui/Button.jsx";
import Input from "./ui/Input.jsx";
import Heading from "./ui/Heading.jsx";

const test = css`
    text-align: center;
`;
const StyledApp = styled.div`
    background-color: orangered;
    padding: 20px;
    ${test}
`;

function App() {
    return (
        <>
            <GlobalStyle/>
            <StyledApp>
                <Heading as="h1">The wild oasis</Heading>
                <Heading as="h2">check in and out</Heading>
                <Button>check in</Button>
                <Button>check out</Button>
                <Heading as="h3">Form</Heading>
                <Input type="number" placeholder="Number of guests"/>
            </StyledApp>
        </>
    );
}

export default App;
// E5 was finished.