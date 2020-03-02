export default interface Service {
    start(): Promise<void>;
}