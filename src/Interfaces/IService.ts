export default interface Service {
    initialize(): Promise<void>;
}