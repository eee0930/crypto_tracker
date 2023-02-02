import styled from "styled-components";

const Button = styled.button`
    border: 2px solid ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.bgColor};
    height: 35px;
    font-size: 14px;
    width: 100px;
    border-radius: 35px;
    position: relative;
    cursor: pointer;
    position: sticky;
    top: 1rem;
    left: 1rem;

    &:before, &:after {
        content: '';
        position: absolute;
        width: 27px;
        height: 27px;
        border-radius: 50%;
        top: 2px;
    }
    &:before {
        left: 2px;
        background-color: #fff;
    }
    &:after {
        right: 2px;
        background-color: #2f3640;
    }
`;

interface IButton {
    title: string;
    onClick: () => void;
}

function ToggleButton({title, onClick}:IButton) {
    return <Button onClick={onClick}>{title}</Button>;
}

export default ToggleButton;