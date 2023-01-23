import { Dimmer, Loader } from "semantic-ui-react";

interface Props
{
    inverted?: Boolean;
    content?: string
}

export default function LoadingComponent({inverted = true, content = "Loading ..."}: Props)
{
    return (
        <Dimmer inverted={inverted} active={true}>
            <Loader content={content}></Loader>
        </Dimmer>
    );
}