import styled from "styled-components";

export const StyledFloater = styled.div`
    position: absolute;
    width: 40px;
    height: auto;
    -webkit-animation: ${({duration}) => `fadein ${duration}ms linear 1 normal forwards`};

    @keyframes fadein {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0
        }
    }
`;
