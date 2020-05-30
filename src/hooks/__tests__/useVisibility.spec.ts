import useVisibility from '../useVisibility';
import {renderHook, act} from '@testing-library/react-hooks';
describe('hook: useVisibility', () => {
    it('should set correct init value: false', () => {
        const {result} = renderHook(() => useVisibility());
        expect(result.current.visible).toBeFalsy();
    });

    it('should set correct init value: true', () => {
        const {result} = renderHook(() => useVisibility(true));
        expect(result.current.visible).toBeTruthy();
    });

    it('should show UI, if show() called', () => {
        const {result} = renderHook(() => useVisibility(false));
        act(() => result.current.show());
        expect(result.current.visible).toBeTruthy();
    });

    it('should hide UI, if hide() called', () => {
        const {result} = renderHook(() => useVisibility(true));
        act(() => result.current.hide());
        expect(result.current.visible).toBeFalsy();
    });
});
