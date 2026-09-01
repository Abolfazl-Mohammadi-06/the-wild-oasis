import styled, {css} from "styled-components";
import GlobalStyle from "./styles/GlobalStyle.js";
import Button from "./ui/Button.jsx";
import Input from "./ui/Input.jsx";
import Heading from "./ui/Heading.jsx";
import Row from "./ui/Row.jsx";

const test = css`
    text-align: center;
`;
const StyledApp = styled.div`
    padding: 20px;
    ${test}
`;

function App() {
    return (
        <>
            <GlobalStyle/>
            <StyledApp>
                <Row>
                    <Row type="horizontal">
                        <Heading as="h1">The wild oasis</Heading>
                        <div>
                            <Heading as="h2">check in and out</Heading>
                            <Button>check in</Button>
                            <Button variations="secondary" size="small">check out</Button>
                        </div>
                    </Row>
                    <Row>
                        <Heading as="h3">Form</Heading>
                        <form>
                            <Input type="number" placeholder="Number of guests"/>
                            <Input type="number" placeholder="Number of guests"/>
                        </form>
                    </Row>
                </Row>
            </StyledApp>
        </>
    );
}

export default App;
// E7 was finished.