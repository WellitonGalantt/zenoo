export interface UseCaseContract<InputDto, OutputDto> {
    execute(input: InputDto): Promise<OutputDto>;
}
